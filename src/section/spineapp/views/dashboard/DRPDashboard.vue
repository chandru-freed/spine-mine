<template>
  <div class="DRPDashboard">
    <!-- TASK TAB -->
    <task-tab v-model="tab"></task-tab>

      <component
      v-if="!!drpDashboardFilterFFormMetaData"
      :ref="drpDashboardFilterFFormMetaData.myRefName"
      :is="drpDashboardFilterFFormMetaData.componentName"
      :value="selectModel(drpDashboardDataInput, undefined)"
      @input="(newValue) => updateModel(drpDashboardDataInput, newValue, undefined)"
      v-bind="drpDashboardFilterFFormMetaData.props"
    ></component>

    <!-- TASK TAB -->
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
      v-if="!!drpDashboardFDataTableMetaData"
      :ref="drpDashboardFDataTableMetaData.myRefName"
      :is="drpDashboardFDataTableMetaData.componentName"
      :value="selectModel(drpDashboardList, undefined)"
      v-bind="drpDashboardFDataTableMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import TaskTab from "@/section/spineapp/components/tab/TaskTab.vue";

import moment from "moment";
import FBtn from "@/components/generic/FBtn.vue";
import Helper from "../../util/Helper";

import ModelVue from "@/components/generic/ModelVue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FForm from "@/components/generic/form/FForm.vue";
import DashboardTab from "../../components/tab/DashboardTab.vue";
import DRPDashboardFDataTableMDP from "./DRPDashboardFDataTableMDP";
import AssignSalesRepToSelfEnrolFileFFormMDP from "./AssignSalesRepToSelfEnrolFileFFormMDP";
import FSnackbar from "@/fsnackbar";
import DRPDashboardFilterFFormMDP from './DRPDashboardFilterFFormMDP'

@Component({
  components: {
    "task-tab": DashboardTab,
    "f-btn": FBtn,
    FDataTable,
    FForm,
  },
})
export default class DRPDashboard extends ModelVue {
  drpDashboardDataInput: Data.Spine.DCPDashboardDatainput =
    new Data.Spine.DCPDashboardDatainput();

  assignSalesRepToSelfEnrolFileInput: Data.Spine.AssignSalesRepToSelfEnrolFileInput =
    new Data.Spine.AssignSalesRepToSelfEnrolFileInput();
  drpDashboardList: Data.Spine.DRPDashboardDataOutput[] = [];

  tab = 0;
  clientFileList = [];
  showAssignForm: boolean = false;
  taskTableRefName: string = "drpDashboardFDataTableRef";

  get drpDashboardFDataTableMetaData() {
    return new DRPDashboardFDataTableMDP({
      parent: this,
    }).getMetaData();
  }

  get assignSalesRepToSelfEnrolFileFFormMetaData() {
    return new AssignSalesRepToSelfEnrolFileFFormMDP({
      root: this,
    }).getMetaData();
  }

  get drpDashboardFilterFFormMetaData() {
          return new DRPDashboardFilterFFormMDP({parent: this}).getMetaData()
  }

  mounted() {
    this.getDRPDashboardData();
  }

  getDRPDashboardData() {
    Action.Spine.GetDRPDashboardData.execute(
      this.drpDashboardDataInput,
      (output) => {
        this.drpDashboardList = output;
      }
    );
  }

  gotoFile(clientFileNumber: string) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: clientFileNumber,
    });
  }

  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }

  assignSalesRep() {
    const clientFileList: string[] =  this.clientFileList.map((item: any) => {
      return item.clientFileId;
    });
    Action.ClientFile.AssignSalesRepList.execute2(this.assignSalesRepToSelfEnrolFileInput.assignedSalesRep, clientFileList, output => {
FSnackbar.success("Succesfully Updated");
        this.getDRPDashboardData();
        this.showAssignForm = false;
        this.clearSelectedItems();
    });
  }

  handleAssignClick(item: any) {
    this.showAssignForm = true;
    this.clientFileList = item;
  }

  clearSelectedItems() {
    (this.$refs[this.taskTableRefName] as any).clearSelectedItems();
  }

  // submitAssignTask(clientFileId: string) {
  //   this.assignSalesRepToSelfEnrolFileInput.clientFileId = clientFileId;
  //   Action.ClientFile.AssignSalesRep.execute(
  //     this.assignSalesRepToSelfEnrolFileInput,
  //     (output) => {
  //       FSnackbar.success("Succesfully Updated");
  //       this.getDRPDashboardData();
  //       this.showAssignForm = false;
  //       this.clearSelectedItems();
  //     }
  //   );
  // }
}
</script>

<style></style>
