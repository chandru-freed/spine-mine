<template>
  <div class="FPPCLientList">
    <task-tab></task-tab>

    <component
      v-if="!!fppClientFilterFFormMetaData"
      :ref="fppClientFilterFFormMetaData.myRefName"
      :is="fppClientFilterFFormMetaData.componentName"
      :value="selectModel(getP2PDashboardDataInput, undefined)"
      @input="
        (newValue) => updateModel(getP2PDashboardDataInput, newValue, undefined)
      "
      v-bind="fppClientFilterFFormMetaData.props"
    ></component>

    <component
      v-if="!!showAssignForm"
      :ref="assignSalesRepToSelfEnrolFileFFormMetaData.myRefName"
      :is="assignSalesRepToSelfEnrolFileFFormMetaData.componentName"
      :value="selectModel(assignSalesRepToSelfEnrolFileInput, undefined)"
      @input="
        (newValue) =>
          updateModel(assignSalesRepToSelfEnrolFileInput, newValue, undefined)
      "
      v-bind="assignSalesRepToSelfEnrolFileFFormMetaData.props"
    ></component>

    <component
      v-if="!!fppClientListFDataTableMetaData"
      :ref="fppClientListFDataTableMetaData.myRefName"
      :is="fppClientListFDataTableMetaData.componentName"
      :value="selectModel(getPartnerList, undefined)"
      v-bind="fppClientListFDataTableMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import FForm from "@/components/generic/form/FForm.vue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import RequestedPartnerListFDataTableMDP from "./RequestedPartnerListFDataTableMDP";
import ModelVue from "@/components/generic/ModelVue";
import DashboardTab from "@/section/spineapp/components/tab/DashboardTab.vue";
import RequestedPartnerListDateSearchFFormMDP from "./RequestedPartnerListDateSearchFFormMDP";
import FPPCLientListFDataTableMDP from "./FPPCLientListFDataTableMDP";
import FPPClientFilterFFormMDP from "../FPPClientFilterFFormMDP";
import AssignSalesRepToSelfEnrolFileFFormMDP from "../AssignSalesRepToSelfEnrolFileFFormMDP";
import FSnackbar from "@/fsnackbar";

@Component({
  components: {
    FForm,
    FDataTable,
    "task-tab": DashboardTab,
  },
})
export default class RequestedPartnerList extends ModelVue {
  getP2PDashboardDataInput: Data.Spine.GetP2PDashboardDataInnput =
    new Data.Spine.GetP2PDashboardDataInnput();

  getPartnerList: Data.Spine.P2PDashboardData[] = [];

  assignSalesRepToSelfEnrolFileInput: Data.Spine.AssignSalesRepToSelfEnrolFileInput =
    new Data.Spine.AssignSalesRepToSelfEnrolFileInput();

  showAssignForm: boolean = false;
  taskIdList = [];

  taskTableRefName: string = "fppClientListRef";

  // Meta data
  get fppClientListFDataTableMetaData() {
    return new FPPCLientListFDataTableMDP({ parent: this }).getMetaData();
  }

  get fppClientFilterFFormMetaData() {
    return new FPPClientFilterFFormMDP({ parent: this }).getMetaData();
  }

  get assignSalesRepToSelfEnrolFileFFormMetaData() {
    return new AssignSalesRepToSelfEnrolFileFFormMDP({
      root: this,
    }).getMetaData();
  }
  // Meta data

  public mounted() {
    this.getP2PDashboardData();
  }

  getP2PDashboardData() {
    Action.Spine.GetP2PDashboardData.execute(
      this.getP2PDashboardDataInput,
      (output) => {
        this.getPartnerList = output;
      }
    );
  }

  assignSalesRep() {
    this.taskIdList.map((item: any) => {
      this.submitAssignTask(item.clientFileId);
    });
  }

  handleAssignClick(item: any) {
    this.showAssignForm = true;
    this.taskIdList = item;
  }

  clearSelectedItems() {
    (this.$refs[this.taskTableRefName] as any).clearSelectedItems();
  }

  submitAssignTask(clientFileId: string) {
    this.assignSalesRepToSelfEnrolFileInput.clientFileId = clientFileId;
    Action.Spine.AssignSalesRepToSelfEnrolFile.execute(
      this.assignSalesRepToSelfEnrolFileInput,
      (output) => {
        FSnackbar.success("Succesfully Updated");
        this.getP2PDashboardData();
        this.showAssignForm = false;
        this.clearSelectedItems();
      }
    );
  }
}
</script>

<style></style>
