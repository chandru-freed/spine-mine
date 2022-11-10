<template>
  <div ref="creditorListRef">
    <component
      v-if="addCreditorDialog"
      :is="addCreditorFormMetaData.componentName"
      :ref="addCreditorFormMetaData.myRefName"
      :value="selectModel(addCreditorForm, undefined)"
      @input="(newValue) => updateModel(addCreditorForm, newValue, undefined)"
      v-bind="addCreditorFormMetaData.props"
    ></component>

    <component
      v-if="editCreditorDialog"
      :is="editCreditorFormMetaData.componentName"
      :ref="editCreditorFormMetaData.myRefName"
      :value="selectModel(editCreditorForm, undefined)"
      @input="(newValue) => updateModel(editCreditorForm, newValue, undefined)"
      v-bind="editCreditorFormMetaData.props"
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
    <v-alert dense outlined text color="warning" class="ma-2" v-if="settleCreditorDialog">
      <div
        class="d-flex flex-row align-start flex-wrap justify-space-around pa-2"
      >
        <div class="my-1">Are you sure want to Settle Creditor?</div>
        <v-spacer />
        <v-btn
          outlined
          color="warning"
          class="ml-2"
          @click="closeAndClearAllForms()"
        >
          Cancel
        </v-btn>
        <v-btn
          outlined
          color="warning"
          class="ml-2"
          @click="settleCreditorData()"
        >
          Mark Settle
        </v-btn>
      </div>
    </v-alert>

    <v-col class="col-12">
      <!--GRID START-->
      <v-card flat outlined>
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
              @click="selectEditCreditor(item, index)"
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
            <v-btn
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

@Component({
  components: {
    FForm,
    FBtn,
  },
})
export default class FCreditor extends ModelVue {
  addCreditorForm: Data.Spine.Creditor = new Data.Spine.Creditor();
  editCreditorForm: Data.Spine.Creditor = new Data.Spine.Creditor();
  settleCreditorInput: Data.ClientFile.SettleCreditorInput = new Data.ClientFile.SettleCreditorInput();
  selectedCreditorItem: Data.Spine.Creditor;
  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  clientFileSummary: Data.ClientFile.FileSummary;

  headers = [
    {
      text: "Creditor Name",
      align: "start",
      sortable: false,
      value: "creditorName",
    },
    { text: "Creditor Balance", value: "creditorBalance" },
    { text: "Last Date Of Payment", value: "lastDateOfPayment" },
    { text: "Debt Type", value: "debtType" },
    { text: "Account Number", value: "accountNumber" },
    { text: "Actions", value: "actions" },
  ];

  addCreditorDialog = false;
  editCreditorDialog = false;
  deleteCreditorDialog = false;
  settleCreditorDialog = false;
  taskId = this.$route.params.taskId;

  @Prop()
  addCreditorFormMetaData: any;

  @Prop()
  editCreditorFormMetaData: any;

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

  showEditForm() {
    this.closeDialogs();
    this.editCreditorDialog = true;
  }
  showSettlePopup() {
    this.settleCreditorDialog = true;
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
    this.settleCreditorDialog = false;
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
    console.log(fiCreditorId);
    Action.Spine.RemoveCreditor.execute1(fiCreditorId, (output) => {
      this.closeDialogs();
      Snackbar.show({
        text: "Succesfully Removed",
        pos: "bottom-center",
      });
    });
  }

  settleCreditorData() {
    this.settleCreditorInput.fiCreditorId =  this.selectedCreditorItem.fiCreditorId;
    Action.ClientFile.SettleCreditor.execute(
      this.settleCreditorInput,
      (output) => {
        this.closeDialogs();
        Snackbar.show({
          text: "Succesfully Settled Creditor",
          pos: "bottom-center",
        });
      },(err)=>(console.log(err))
    );
  }

  selectEditCreditor(item: any, index: any) {
    this.selectedCreditorItem = item;
    this.editCreditorForm = {
      ...item,
    };
    this.showEditForm();
  }
  selectDeleteCreditor(item: any, index: number) {
    this.selectedCreditorItem = item;
    this.showDeletePopup();
    console.log(this.deleteCreditorDialog);
  }

  selectSettleCreditor(item: any, index: number) {
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
}
</script>
