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

    <v-col class="col-12">
      <v-card flat>
        <component
          :value="fiCreditorList"
          :is="fCreditorListFDataTableMetaData.componentName"
          :ref="fCreditorListFDataTableMetaData.myRefName"
          v-bind="fCreditorListFDataTableMetaData.props"
        ></component>
      </v-card>
      <!-- <v-card flat>
        <component
          :value="excludedCreditorList"
          :is="creditorListIEFDataTableMetaData.componentName"
          :ref="creditorListIEFDataTableMetaData.myRefName"
          v-bind="creditorListIEFDataTableMetaData.props"
        ></component>
      </v-card> -->
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
import Task from "@/section/spineapp/util/Task";
import FAddCreditorV4FFormMDP from "./FAddCreditorV4FFormMDP";
import FEditCreditorV4FFormMDP from "./FEditCreditorV4FFormMDP";
import FAV4CreditorListFDataTableMDP from "./FAV4CreditorListFDataTableMDP";
import FDataTable from "../../table/FDataTable.vue";
import moment from "moment";
import FSnackbar from "@/fsnackbar";
import FAV4CreditorListInEligibleFDataTableMDP from './FAV4CreditorListInEligibleFDataTableMDP';

@Component({
  components: {
    FForm,
    FBtn,
    FDataTable,
  },
})
export default class FAmendmentCreditorV4 extends ModelVue {
  addCreditorForm: any = new Data.ClientFile.AmendmentFiCreditor();
  editCreditorForm: Data.ClientFile.AmendmentFiCreditor = new Data.ClientFile.AmendmentFiCreditor();

  selectedCreditorItem: Data.ClientFile.AmendmentFiCreditor;
  selectedCreditorIndex: number;
  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  clientFileSummary: Data.ClientFile.FileSummary;

  addCreditorDialog = false;
  editCreditorDialog = false;
  

  taskId = this.$route.params.taskId;

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

  closeAndClearAllForms() {
    this.closeDialogs();
    this.resetForms();
  }
  closeDialogs() {
    this.addCreditorDialog = false;
    this.editCreditorDialog = false;
  }
  resetForms() {
    this.addCreditorForm = new Data.Spine.Creditor();
    this.editCreditorForm = new Data.ClientFile.AmendmentFiCreditor();
  }

  
  get fiCreditorList() {
    return (this.modelValue.fiCreditorList as Data.ClientFile.AmendmentFiCreditor[])
  }



  get totalDebt() {
    return this.modelValue.totalDebt;
  }


  calculateTotadDebt() {
    return this.modelValue.fiCreditorList.reduce(
      (accumulator: number, curVal: any) => {
        return accumulator + curVal.creditorBalance;
      },
      0
    );
  }

  getWAD() {
    const totalCreditorBalance = this.calculateTotadDebt();
    const wad = this.modelValue.fiCreditorList.reduce(
      (accumulator: number, curCreditorVal: Data.ClientFile.FiCreditor) => {
        const creditorPercentage =
          curCreditorVal.creditorBalance / totalCreditorBalance;
        const indWad =
          creditorPercentage * curCreditorVal.daysDelinquentAsOnOnboarding;
        return accumulator + indWad;
      },
      0
    );
    // let totalCreditorBalance = fiCreditorList.map(_.creditorBalance).sum
    // fiCreditorList.map {
    //   fiCreditor =>
    //     val creditorPercentage = (fiCreditor.creditorBalance / totalCreditorBalance).toDouble
    //     creditorPercentage * fiCreditor.daysDelinquentAsOnOnboarding
    // }.sum.toInt

    return Math.round(wad);
  }

  addCreditor() {
    const creditorList: any[] = this.modelValue.fiCreditorList || [];
    this.addCreditorForm.fiCreditorId = undefined;
    this.addCreditorForm.settlementStatus = "ACTIVE";
    this.addCreditorForm.daysDelinquentAsOnOnboarding = this.getDaysDelinquent(
      this.addCreditorForm
    );
    creditorList.push(this.addCreditorForm.toJson());
    this.modelValue.totalDebt = this.calculateTotadDebt();
    this.saveTask();
    // this.updateModel()
  }

  getDaysDelinquent(creditor: Data.ClientFile.AmendmentFiCreditor) {
    return moment().diff(creditor.lastDateOfPayment, "days");
  }

  removeCreditor(item: any, index: number) {
    return new Promise((resolve) => {
      if (this.isCreditorSettled(item.settlementStatus)) {
        FSnackbar.error("Creditor status should not be settled or partialy settled");
      } else {
        // const creditorList: any[] = this.modelValue.creditorList || [];
        this.modelValue.fiCreditorList.splice(index, 1);
        this.modelValue.totalDebt = this.calculateTotadDebt();
        this.saveTask();
      }
    });
  }

  selectEditCreditor(item: any, index: number) {
    if (this.isCreditorSettled(item.settlementStatus)) {
      FSnackbar.error("Creditor status should not be settled or partialy settled");
    } else {
      this.selectedCreditorItem = item;
      this.selectedCreditorIndex = index;
      index;
      this.editCreditorForm = {
        ...item,
      };
      this.showEditForm();
    }
  }

  isCreditorSettled(settlementStatus: string): boolean {
    return (
      settlementStatus === Data.Spine.FICREDITOR_STATUS.SETTLED.id ||
      settlementStatus === Data.Spine.FICREDITOR_STATUS.PARTIALLY_SETTLED.id
    );
  }

  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }

  get addCreditorFormMetaData() {
    return new FAddCreditorV4FFormMDP({
      taskRoot: this.taskRoot,
      parent: this,
    }).getMetaData();
  }

  get editCreditorFormMetaData() {
    return new FEditCreditorV4FFormMDP({
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

  get fCreditorListFDataTableMetaData() {
    return new FAV4CreditorListFDataTableMDP({ parent: this }).getMetaData();
  }


   get creditorListIEFDataTableMetaData() {
  return new FAV4CreditorListInEligibleFDataTableMDP({ parent: this }).getMetaData();
  }

  saveTask() {
    Task.Action.saveTask({
      taskId: this.taskId,
      taskOutput: this.taskRoot.taskFormData.taskOutput,
      callback: () => {
        this.closeAndClearAllForms();
      },
    });
  }

  handleIncludeInProgram(item: any) {
    Action.ClientFile.IncludeFiCreditorInProgramAmendment.execute2(this.taskRoot.amendmentToken,item.amendmentFiCreditorId, output => {

    });
  }

  handleExcludeInProgram(item: any) {
    Action.ClientFile.ExcludeFiCreditorInProgramAmendment.execute2(this.taskRoot.amendmentToken,item.amendmentFiCreditorId, output => {

    });
  }


  handleClientCreditorChange(item: any) {
    this.addCreditorForm = Data.Spine.Creditor.fromJson(item);
  }
}
</script>
