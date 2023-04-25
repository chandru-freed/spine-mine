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
        v-if="editCreditorDialog"
        :is="updateAccountNoFormMetaData.componentName"
        :ref="updateAccountNoFormMetaData.myRefName"
        :value="selectModel(editCreditorForm, undefined)"
        @input="
          (newValue) => updateModel(editCreditorForm, newValue, undefined)
        "
        v-bind="updateAccountNoFormMetaData.props"
      ></component>

      <component
        :is="creditorListFDataTableMetaData.componentName"
        :ref="creditorListFDataTableMetaData.myRefName"
        v-bind="creditorListFDataTableMetaData.props"
        :value="creditorList"
        class="my-4"
      ></component>
      <component
        :is="creditorListIEFDataTableMetaData.componentName"
        :ref="creditorListIEFDataTableMetaData.myRefName"
        v-bind="creditorListIEFDataTableMetaData.props"
        :value="ineligibleCreditorList"
      ></component>
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
import CreditorListFDataTableMDP from "./CreditorListFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import CFUpdateCreditScoreFFormMDP from "./CFUpdateCreditScoreFFormMDP";
import CFUpdateAccountNoFFormMDP from "./CFUpdateAccountNoFFormMDP";
import CreditorListInEligibleFDataTableMDP from './CreditorListInEligibleFDataTableMDP';
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
  editCreditorDialog: boolean = false;

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
    this.editCreditorDialog = false;
  }
  resetForms() {
    this.addCreditorForm = new Data.Spine.Creditor();
    this.editCreditorForm = new Data.Spine.Creditor();
  }

  showAddCreditScoreForm() {
    this.closeDialogs();
    this.addCreditScoreDialog = true;
    this.updateCreditScoreForm.creditScore =
      this.clientFileBasicInfo.creditScore || 0;
    this.updateCreditScoreForm.creditBureau =
      this.clientFileBasicInfo.creditBureau || "";
  }

get creditorList() {
    return (this.modelValue.creditorList as Data.ClientFile.FiCreditor[])?.filter(item => !item.ineligible);
  }

  get ineligibleCreditorList() {
    return (this.modelValue.creditorList as any[])?.filter(item => item.ineligible);
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

  handleAddAccountNoClick(item: any) {
    console.log(item);
    this.editCreditorForm = Data.Spine.Creditor.fromJson(item);
    console.log(this.editCreditorForm);
    this.editCreditorDialog = true;
  }

  isClientFileLead(): boolean {
    return this.clientFileBasicInfo.clientFileStatus.id === "LEAD";
  }

  get creditorListFDataTableMetaData() {
    return new CreditorListFDataTableMDP({ parent: this }).getMetaData();
  }

  get creditorListIEFDataTableMetaData() {
    return new CreditorListInEligibleFDataTableMDP({parent: this}).getMetaData();
  }
  get updateCreditScoreFFormMetaData() {
    return new CFUpdateCreditScoreFFormMDP({
      taskRoot: this.taskRoot,
      parent: this,
    }).getMetaData();
  }

  get updateAccountNoFormMetaData() {
    return new CFUpdateAccountNoFFormMDP({
      taskRoot: this.taskRoot,
      parent: this,
    }).getMetaData();
  }
}
</script>
