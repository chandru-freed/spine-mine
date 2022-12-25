<template>
  <div class="TaskAssignedToMe">
    <!-- MIS REPORTS TAB -->
    <misreports-tab v-model="tab"></misreports-tab>
    <!-- MIS REPORTS TAB -->
    <v-card>
      <component
        v-if="!!misReportsFDataTableMetaData"
        :ref="misReportsFDataTableMetaData.myRefName"
        :is="misReportsFDataTableMetaData.componentName"
        :value="selectModel(allocatedTaskList, undefined)"
        v-bind="misReportsFDataTableMetaData.props"
      ></component>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import MISReportsTab from "@/section/spineapp/components/tab/MISReportsTab.vue";

import moment from "moment";
import FBtn from "@/components/generic/FBtn.vue";
import Helper from "../../util/Helper";
import MISReportsFDataTableMDP from "./MISReportsFDataTableMDP";
import ModelVue from "@/components/generic/ModelVue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FForm from "@/components/generic/form/FForm.vue";

@Component({
  components: {
    "misreports-tab": MISReportsTab,
    "f-btn": FBtn,
    FDataTable,
    FForm,
  },
})
export default class MISReports extends ModelVue {
  tab = 0;

  selected = [];
  search = "";

  allocatedTaskList: Data.TaskList.GetActiveTaskListAllocatedGrid[] = [];
  suspendTaskInput: Data.TaskList.SuspendTaskInput =
    new Data.TaskList.SuspendTaskInput();
  showSuspendForm: boolean = false;
  taskTableRefName: string = "taskAssignedToMeFDataTableRef";
  mounted() {
    Action.TaskList.Suspend.interested(this.getActiveTLAllocatedWithDelay);
    this.getActiveTaskListAllocatedGrid();
  }

  destroyed() {
    Action.TaskList.Suspend.notInterested(this.getActiveTLAllocatedWithDelay);
  }

  getActiveTLAllocatedWithDelay() {
    setTimeout(() => {
      this.getActiveTaskListAllocatedGrid();
    }, 1000);
  }
  getActiveTaskListAllocatedGrid() {
    Action.TaskList.GetActiveTaskListAllocated.execute((output) => {
      this.allocatedTaskList = output;
    });
  }

  gotoFile(item: any) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: item.cid,
    });
  }

  gotoTask(item: any) {
    this.$router.push({
      name: "Root.CFTaskRedirect",
      params: { clientFileNumber: item.cid, taskId: item.taskId },
    });
  }

  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }

  handleSuspendClick(item: any) {
    this.showSuspendForm = true;
    this.suspendTaskInput.taskId = item.taskId;
  }

  get misReportsFDataTableMetaData() {
    return new MISReportsFDataTableMDP({
      parent: this,
      myRefName: this.taskTableRefName,
    }).getMetaData();
  }

  clearTableAndForm() {
    this.showSuspendForm = false;
    (this.$refs[this.taskTableRefName] as any).clearSelectedItems();
  }
}
</script>

<style></style>
