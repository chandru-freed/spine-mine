<template>
  <div ref="creditorListRef">
    <v-col class="col-12">
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

      <component
        :is="creditorListFDataTableMetaData.componentName"
        :ref="creditorListFDataTableMetaData.myRefName"
        v-bind="creditorListFDataTableMetaData.props"
        :value="creditorList"
      ></component>
      <!--GRID START-->
      <!-- <v-card flat outlined>
        <v-data-table
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
            </v-toolbar>
          </template>
          <template v-slot:[`item.creditorBalance`]="{ item }">
            {{ item.creditorBalance | toINR }}
          </template>
          <template v-slot:[`item.actions`]="{ item, index }">
            <v-btn
              :disabled="item.settlementStatus === 'SETTLED'"
              small
              dense
              outlined
              color="primary"
              class="ml-2"
              @click="selectSettleCreditor(item, index)"
            >
              Mark Settle
            </v-btn>
          </template>
        </v-data-table>
      </v-card> -->
      <!--GRID END-->
      <!--ACTION START-->
      <div
        class="
          d-flex
          flex-row
          align-start
          flex-wrap
          justify-space-around
          pa-2
          my-5
        "
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
import CreditorListFDataTableMDP from "./CreditorListFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import CFUpdateCreditScoreFFormMDP from "./CFUpdateCreditScoreFFormMDP";
@Component({
  components: {
    FForm,
    FBtn,
    FDataTable,
  },
})
export default class FCreditor extends ModelVue {
  addCreditorForm: Data.Spine.Creditor = new Data.Spine.Creditor();
  editCreditorForm: Data.Spine.Creditor = new Data.Spine.Creditor();
  settleCreditorInput: Data.ClientFile.SettleCreditorInput =
    new Data.ClientFile.SettleCreditorInput();
  updateCreditScoreForm: Data.ClientFile.UpdateCreditInfoInput =
    new Data.ClientFile.UpdateCreditInfoInput();
  selectedCreditorItem: Data.Spine.Creditor;
  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  clientFileSummary: Data.ClientFile.FileSummary;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  clientFileId = this.$route.params.clientFileId;

  addCreditScoreDialog = false;

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
    { text: "Settlement Status", value: "settlementStatus" },
    { text: "Actions", value: "actions" },
  ];

  settleCreditorDialog = false;
  taskId = this.$route.params.taskId;

  @Prop()
  actionMetaDataList: any[];

  @Prop()
  disabled: boolean;

  @Prop()
  readonly: boolean;

  @Prop()
  taskRoot: any;

  showSettlePopup() {
    this.settleCreditorDialog = true;
  }

  closeAndClearAllForms() {
    this.closeDialogs();
    this.resetForms();
  }
  closeDialogs() {
    this.settleCreditorDialog = false;
    this.addCreditScoreDialog = false;
  }
  resetForms() {
    this.addCreditorForm = new Data.Spine.Creditor();
    this.editCreditorForm = new Data.Spine.Creditor();
  }

  showAddCreditScoreForm() {
    this.closeDialogs();
    this.addCreditScoreDialog = true;
    this.updateCreditScoreForm.creditScore = this.clientFileBasicInfo.creditScore || 0;
    this.updateCreditScoreForm.creditBureau =
      this.clientFileBasicInfo.creditBureau || "";
  }

  get creditorList() {
    return this.modelValue.creditorList;
  }

  get totalDebt() {
    return this.modelValue.totalDebt;
  }

  settleCreditorData(item: any) {
    this.settleCreditorInput.fiCreditorId = item.fiCreditorId;
    Action.ClientFile.SettleCreditor.execute(
      this.settleCreditorInput,
      (output) => {
        this.closeDialogs();
        this.getFiCreditorInfo();
        this.findClientFileSummary();
        Snackbar.show({
          text: "Succesfully Settled Creditor",
          pos: "bottom-center",
        });
      },
      (err) => console.log(err)
    );
  }

  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }
  findClientFileSummary() {
    Action.ClientFile.GetClientFileSummary.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  selectSettleCreditor(item: any) {
    this.selectedCreditorItem = item;
    this.showSettlePopup();
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

  isClientFileLead(): boolean {
    return this.clientFileBasicInfo.clientFileStatus.id === 'LEAD'
  }

  get creditorListFDataTableMetaData() {
    return new CreditorListFDataTableMDP({ parent: this }).getMetaData();
  }
  get updateCreditScoreFFormMetaData() {
    return new CFUpdateCreditScoreFFormMDP({
      taskRoot: this.taskRoot,
      parent: this,
    }).getMetaData();
  }
}
</script>
