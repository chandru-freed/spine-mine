<template>
  <div class="ClientCreditor">
    <component
      v-if="includeCreditorToCCDialog"
      :is="includeCreditorToCCFormMetaData.componentName"
      :ref="includeCreditorToCCFormMetaData.myRefName"
      :value="selectModel(includeCreditorToCCForm, undefined)"
      @input="
        (newValue) => updateModel(includeCreditorToCCForm, newValue, undefined)
      "
      v-bind="includeCreditorToCCFormMetaData.props"
    ></component>

    <component
      v-if="includeCreditorToAmendmentDialog"
      :is="includeCreditorToAmendmentFormMetaData.componentName"
      :ref="includeCreditorToAmendmentFormMetaData.myRefName"
      :value="selectModel(includeCreditorToAmendmentForm, undefined)"
      @input="
        (newValue) =>
          updateModel(includeCreditorToAmendmentForm, newValue, undefined)
      "
      v-bind="includeCreditorToAmendmentFormMetaData.props"
    ></component>

    <component
      v-if="!!fClientCreditorListFDataTableMetaData"
      :ref="fClientCreditorListFDataTableMetaData.myRefName"
      :is="fClientCreditorListFDataTableMetaData.componentName"
      :value="filteredClCreditorList"
      v-bind="fClientCreditorListFDataTableMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import FDataTable from "../../table/FDataTable.vue";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import FClientCreditorListFDataTableMDP from "./FClientCreditorListFDataTableMDP";
import IncludeCCToProgramFFormMDP from "./IncludeCCToProgramFFormMDP";
import IncludeCCToAmendmentFFormMDP from "./IncludeCCToAmendmentFFormMDP";
import FForm from "../../form/FForm.vue";
import ModelVue from "../../ModelVue";
import { ProcessType } from "./FClientCreditorListMDP";
@Component({
  components: {
    FDataTable,
    FForm,
  },
})
export default class FClientCreditorList extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.clCreditorList
  clCreditorList: Data.ClientFile.ClCreditor[];

  @Prop()
  processType: ProcessType;

  @Prop()
  taskRoot: any;
  
  @Prop({
    default: () => []
  })
  includedCreditorList: any[];
  includeCreditorToCCForm: Data.Spine.Creditor = new Data.Spine.Creditor();
  includeCreditorToCCDialog = false;

  includeCreditorToAmendmentForm: Data.ClientFile.AmendmentFiCreditor =
    new Data.ClientFile.AmendmentFiCreditor();
  includeCreditorToAmendmentDialog = false;

  public mounted() {
    this.getClientCreditorList();
    Action.ClientFile.AddIncludeFiCreditor.interested(
      this.getClientCreditorListHandler
    );
  }

  destroyed() {
    Action.ClientFile.AddIncludeFiCreditor.notInterested(
      this.getClientCreditorListHandler
    );
  }

  getClientCreditorListHandler = () => {
    setTimeout(() => {
      this.getClientCreditorList();
    }, 500);
  };
  getClientCreditorList() {
    Action.ClientFile.GetClCreditorList.execute1(
      this.clientFileBasicInfo.clientBasicInfo.clientId,
      (output) => {}
    );
  }

  handleIncludeCreditor(item: any) {
    if (this.processType === ProcessType.Normal) {
      this.includeCreditorToCCDialog = true;
      this.includeCreditorToCCForm = Data.Spine.Creditor.fromJson(item);
    } else {
      this.includeCreditorToAmendmentDialog = true;
      this.includeCreditorToAmendmentForm =
        Data.ClientFile.AmendmentFiCreditor.fromJson(item);
    }

  }

  closeAndClearAllForms() {
    this.closeDialogs();
    this.resetForms();
  }
  closeDialogs() {
    this.includeCreditorToCCDialog = false;
    this.includeCreditorToAmendmentDialog = false;
    // this.parseCreditReportInput = new Data.Spine.ParseCreditReportInput();
  }
  resetForms() {
    this.includeCreditorToCCForm = new Data.Spine.Creditor();
    this.includeCreditorToAmendmentForm =
      new Data.ClientFile.AmendmentFiCreditor();
  }

  get fClientCreditorListFDataTableMetaData() {
    return new FClientCreditorListFDataTableMDP({ parent: this }).getMetaData();
  }

  get includeCreditorToCCFormMetaData() {
    return new IncludeCCToProgramFFormMDP({
      taskRoot: this.taskRoot,
      parent: this,
    }).getMetaData();
  }

  get includeCreditorToAmendmentFormMetaData() {
    return new IncludeCCToAmendmentFFormMDP({
      taskRoot: this.taskRoot,
      parent: this,
    }).getMetaData();
  }

  get filteredClCreditorList() {
    return this.clCreditorList.filter(clCreditor => {
      return this.includedCreditorList.findIndex(item => item.clCreditorId === clCreditor.clCreditorId) === -1
    })
  }

  isCreditCard(): boolean {
    if (this.processType === ProcessType.Normal) {
      return this.includeCreditorToCCForm.debtType === "Credit Card";
    } else {
      return this.includeCreditorToAmendmentForm.debtType === "Credit Card";
    }
  }

  get totalCreditorBalance() {
    return this.filteredClCreditorList.reduce((accumulator: number, curVal: any) => {
      return accumulator + curVal.creditorBalance;
      
    },0)
  }
}
</script>

<style>
</style>
