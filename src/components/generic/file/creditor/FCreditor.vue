<template>
  <div ref="creditorListRef">
    <f-loader v-if="showLoader" />
    <component
      v-if="addCreditorDialog"
      :is="addCreditorFormMetaData.componentName"
      :ref="addCreditorFormMetaData.myRefName"
      :value="selectModel(addCreditorForm, undefined)"
      @input="(newValue) => updateModel(addCreditorForm, newValue, undefined)"
      v-bind="addCreditorFormMetaData.props"
    ></component>
    <div v-if="showParseCreditReportForm && !showLoader">
      <v-alert class="ma-5" color="warning" outlined >
        <v-icon color="warning">mdi-alert</v-icon>
        This will update the credit score, personal info and add creditors from the credit report you upload </v-alert>
    <component
      :is="parseCreditReportMetaData.componentName"
      :ref="parseCreditReportMetaData.myRefName"
      :value="selectModel(parseCreditReportInput, undefined)"
      @input="
        (newValue) => updateModel(parseCreditReportInput, newValue, undefined)
      "
      v-bind="parseCreditReportMetaData.props"
    ></component>
    </div>

    <component
      v-if="editCreditorDialog"
      :is="editCreditorFormMetaData.componentName"
      :ref="editCreditorFormMetaData.myRefName"
      :value="selectModel(editCreditorForm, undefined)"
      @input="(newValue) => updateModel(editCreditorForm, newValue, undefined)"
      v-bind="editCreditorFormMetaData.props"
    ></component>

    <component
      v-if="addCreditScoreDialog"
      :is="updateCreditScoreFFormMetaData.componentName"
      :ref="updateCreditScoreFFormMetaData.myRefName"
      :value="selectModel(updateCreditScoreForm, undefined)"
      @input="
        (newValue) => updateModel(updateCreditScoreForm, newValue, undefined)
      "
      v-bind="updateCreditScoreFFormMetaData.props"
    ></component>
    <v-alert dense outlined text color="error" v-if="deleteCreditorDialog">
      <div
        class="d-flex flex-row align-start flex-wrap justify-space-around pa-2"
      >
        <div class="my-1">Are you sure want to delete?</div>
        <v-spacer />
        <FBtn
          label="Cancel"
          :on-click="closeAndClearAllForms"
          outlined
          color="red"
          class="mx-2"
        />
        <FBtn
          label="Delete"
          :on-click="deleteCreditorData"
          outlined
          color="red"
          class="mx-2"
        />
      </div>
    </v-alert>

    <v-col class="col-12">
      <!--GRID START-->
      <v-card flat>
        <component
          :value="creditorList"
          :is="fCreditorListFDataTableMetaData.componentName"
          :ref="fCreditorListFDataTableMetaData.myRefName"
          v-bind="fCreditorListFDataTableMetaData.props"
        ></component>
        <!-- <v-data-table
          :headers="filteredHeaders"
          :items="creditorList"
          sort-by="lastDateOfPayment"
          class="elevation-0"
        >
          <template v-slot:[`item.lastDateOfPayment`]="{ item }">
            <span class="grey--text">
              {{ item.lastDateOfPayment | date }}
            </span>
          </template>
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Creditors</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-chip label outlined color="primary"
                >Total Debt - {{ totalDebt | toINR }}</v-chip
              >
              <v-chip
                v-if="clientFileSummary?.wad"
                label
                outlined
                color="primary"
                class="mx-2"
                >WAD - {{ clientFileSummary.wad }}</v-chip
              >

              <v-spacer></v-spacer>
              <v-btn
                :disabled="disabled"
                icon
                color="primary"
                class="mb-2"
                @click="showAddForm"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:[`item.creditorBalance`]="{ item }">
            {{ item.creditorBalance | toINR }}
          </template>
          <template v-slot:[`item.actions`]="{ item, index }">
            <v-icon
              :disabled="disabled"
              small
              class="mr-2"
              @click="selectEditCreditor(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              :disabled="disabled"
              small
              @click="selectDeleteCreditor(item, index)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table> -->
      </v-card>
      <!--GRID END-->
      <!--ACTION START-->
      <div
        class="d-flex flex-row align-start flex-wrap justify-space-around pa-2 my-5"
        v-if="!disabled"
      >
        <component
          v-for="(actionMetaData, index) of actionMetaDataListFiltered"
          :key="'action' + index"
          :is="actionMetaData.componentName"
          :ref="actionMetaData.myRefName"
          v-bind="actionMetaData.props"
        ></component>
      </div>
      <!--ACTION END-->
    </v-col>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import store, * as Store from "@/../src-gen/store";
import FBtn from "@/components/generic/FBtn.vue";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FAddCreditorFFormMDP from "./FAddCreditorFFormMDP";
import FEditCreditorFFormMDP from "./FEditCreditorFFormMDP";
import FCreditorListFDataTableMDP from "./FCreditorListFDataTableMDP";
import FDataTable from "../../table/FDataTable.vue";
import FUpdateCreditScoreFFormMDP from "./FUpdateCreditScoreFFormMDP";
import FParseCreditReportFFormMDP from "./FParseCreditReportFFormMDP";
import FLoader from "../../FLoader.vue";
import ErrorResponse from "@/error-response";
import axios from "axios";
// import ParsePDF from './ParsePDF';

@Component({
  components: {
    FForm,
    FBtn,
    FDataTable,
    FLoader,
  },
})
export default class FCreditor extends ModelVue {
  addCreditorForm: Data.Spine.Creditor = new Data.Spine.Creditor();
  editCreditorForm: Data.Spine.Creditor = new Data.Spine.Creditor();
  updateCreditScoreForm: Data.ClientFile.UpdateCreditInfoInput =
    new Data.ClientFile.UpdateCreditInfoInput();

  selectedCreditorItem: Data.Spine.Creditor;
  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  clientFileSummary: Data.ClientFile.FileSummary;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  showParseCreditReportForm: boolean = false;
  showLoader: boolean = false;

  parseCreditReportInput: Data.Spine.ParseCreditReportInput =
    new Data.Spine.ParseCreditReportInput();

  clientFileId = this.$route.params.clientFileId;

  headers = [
    {
      text: "Creditor Name",
      align: "start",
      sortable: false,
      value: "creditorName",
    },
    { text: "Creditor Balance", value: "creditorBalance" },
    { text: "Last Date Of Payment", value: "lastDateOfPayment" },
    { text: "Days Delinquent", value: "daysDelinquentAsOnOnboarding" },

    { text: "Debt Type", value: "debtType" },
    { text: "Account Number", value: "accountNumber" },
    { text: "Actions", value: "actions" },
  ];

  addCreditorDialog = false;
  addCreditScoreDialog = false;
  editCreditorDialog = false;
  deleteCreditorDialog = false;

  taskId = this.$route.params.taskId;

  // @Prop()
  // addCreditorFormMetaData: any;

  // @Prop()
  // editCreditorFormMetaData: any;

  @Prop()
  actionMetaDataList: any[];

  @Prop()
  disabled: boolean;

  @Prop()
  readonly: boolean;

  @Prop()
  taskRoot: any;

  showAddForm() {
    this.closeDialogs();
    this.addCreditorDialog = true;
  }

  showAddCreditScoreForm() {
    this.closeDialogs();
    this.addCreditScoreDialog = true;
    this.updateCreditScoreForm.creditScore =
      this.clientFileBasicInfo.creditScore || 0;
    this.updateCreditScoreForm.creditBureau =
      this.clientFileBasicInfo.creditBureau || "";
  }

  showEditForm() {
    this.closeDialogs();
    this.editCreditorDialog = true;
  }

  showDeletePopup() {
    this.closeAndClearAllForms();
    this.deleteCreditorDialog = true;
  }
  closeAndClearAllForms() {
    this.closeDialogs();
    this.resetForms();
  }
  closeDialogs() {
    this.addCreditorDialog = false;
    this.editCreditorDialog = false;
    this.deleteCreditorDialog = false;
    this.addCreditScoreDialog = false;
    this.showParseCreditReportForm = false;
    this.showLoader = false;
    this.parseCreditReportInput = new Data.Spine.ParseCreditReportInput();
  }
  resetForms() {
    this.addCreditorForm = new Data.Spine.Creditor();
    this.editCreditorForm = new Data.Spine.Creditor();
  }

  get creditorList() {
    return this.modelValue.creditorList;
  }

  get totalDebt() {
    return this.modelValue.totalDebt;
  }

  // totalDebtAmount() {
  //   const totalDebtAmount = this.modelValue.creditorList
  //     .map((creditor: any) => creditor.creditorBalance)
  //     .reduce((accumulator: number, objValue: any) => {
  //       return accumulator + objValue;
  //     }, 0);
  //   this.modelValue.totalDebtAmount = totalDebtAmount;
  //   return this.modelValue.totalDebtAmount;
  // }

  deleteCreditorData() {
    const fiCreditorId = this.selectedCreditorItem.fiCreditorId;
    Action.Spine.RemoveCreditor.execute1(fiCreditorId, (output) => {
      this.closeDialogs();
      Snackbar.show({
        text: "Succesfully Removed",
        pos: "bottom-center",
      });
    });
  }

  selectEditCreditor(item: any) {
    this.selectedCreditorItem = item;
    this.editCreditorForm = {
      ...item,
    };
    this.showEditForm();
  }
  selectDeleteCreditor(item: any, index: number) {
    this.selectedCreditorItem = item;
    this.showDeletePopup();
  }

  get filteredHeaders() {
    if (this.readonly === true) {
      return this.headers.filter((item) => item.value !== "actions");
    }
    return this.headers;
  }

  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }

  get addCreditorFormMetaData() {
    return new FAddCreditorFFormMDP({
      taskRoot: this.taskRoot,
      parent: this,
    }).getMetaData();
  }

  get editCreditorFormMetaData() {
    return new FEditCreditorFFormMDP({
      taskRoot: this.taskRoot,
      parent: this,
    }).getMetaData();
  }

  get updateCreditScoreFFormMetaData() {
    return new FUpdateCreditScoreFFormMDP({
      taskRoot: this.taskRoot,
      parent: this,
    }).getMetaData();
  }

  isCreditCard(): boolean {
    if (this.addCreditorDialog) {
      return this.addCreditorForm.debtType === "Credit Card";
    } else {
      return this.editCreditorForm.debtType === "Credit Card";
    }
  }

  addCreditorFromPDF() {
    this.showLoader = true;
    // const parsePdf = new ParsePDF({parent: this, taskRoot: this.taskRoot});
    // parsePdf.handleUploadCreditReportPDF();
  }

  get fCreditorListFDataTableMetaData() {
    return new FCreditorListFDataTableMDP({ parent: this }).getMetaData();
  }

  get parseCreditReportMetaData() {
    return new FParseCreditReportFFormMDP({ parent: this }).getMetaData();
  }



  
}
</script>
