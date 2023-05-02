<template>
  <div class="DCPDashboard">
    <!-- TASK TAB -->
    <task-tab v-model="tab"></task-tab>
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
      v-if="!!dcpDashboardFDataTableMetaData"
      :ref="dcpDashboardFDataTableMetaData.myRefName"
      :is="dcpDashboardFDataTableMetaData.componentName"
      :value="selectModel(dcpDashboardList, undefined)"
      v-bind="dcpDashboardFDataTableMetaData.props"
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
import DCPDashboardFDataTableMDP from "./DCPDashboardFDataTableMDP";
import FSnackbar from "@/fsnackbar";
import AssignSalesRepToSelfEnrolFileFFormMDP from "./AssignSalesRepToSelfEnrolFileFFormMDP";

@Component({
  components: {
    "task-tab": DashboardTab,
    "f-btn": FBtn,
    FDataTable,
    FForm,
  },
})
export default class DCPDashboard extends ModelVue {
  dcpDashboardDataInput: Data.Spine.DCPDashboardDatainput =
    new Data.Spine.DCPDashboardDatainput();
  assignSalesRepToSelfEnrolFileInput: Data.Spine.AssignSalesRepToSelfEnrolFileInput =
    new Data.Spine.AssignSalesRepToSelfEnrolFileInput();

  dcpDashboardList: Data.Spine.DCPDashboardDataOutput[] = [];

  tab = 0;
  taskIdList = [];
  showAssignForm: boolean = false;
  taskTableRefName: string = "dcpDashboardFDataTableRef";

  get dcpDashboardFDataTableMetaData() {
    return new DCPDashboardFDataTableMDP({
      parent: this,
    }).getMetaData();
  }

  get assignSalesRepToSelfEnrolFileFFormMetaData() {
    return new AssignSalesRepToSelfEnrolFileFFormMDP({
      root: this,
    }).getMetaData();
  }

  mounted() {
    this.getDCPDashboardData();
  }

  getDCPDashboardData() {
    Action.Spine.GetDCPDashboardData.execute(
      this.dcpDashboardDataInput,
      (output) => {
        this.dcpDashboardList = output;
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
        this.getDCPDashboardData();
        this.showAssignForm = false;
        this.clearSelectedItems();
      }
    );
  }
}
</script>

<style></style>
