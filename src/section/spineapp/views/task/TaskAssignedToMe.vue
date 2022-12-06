<template>
  <div class="TaskAssignedToMe">
    <!-- TASK TAB -->
    <task-tab v-model="tab"></task-tab>
    <!-- TASK TAB -->
    
    <component
      v-if="!!taskAssignedToMeFDataTableMetaData"
      :ref="taskAssignedToMeFDataTableMetaData.myRefName"
      :is="taskAssignedToMeFDataTableMetaData.componentName"
      :value="selectModel(allocatedTaskList, undefined)"
      v-bind="taskAssignedToMeFDataTableMetaData.props"
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
import TaskAssignedToMeFDataTableMDP from "./TaskAssignedToMeFDataTableMDP";
import ModelVue from "@/components/generic/ModelVue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FForm from "@/components/generic/form/FForm.vue";

@Component({
  components: {
    "task-tab": TaskTab,
    "f-btn": FBtn,
    FDataTable,
    FForm,
  },
})
export default class TaskAssignedToMe extends ModelVue {
  tab = 0;

  selected = [];
  search = "";

  allocatedTaskList: Data.TaskList.GetActiveTaskListAllocatedGrid[] = [];

  allocatedTaskGridHeaderList = [
    // { text: "Task Id", value: "taskId" },
    { text: "File Number", value: "cid", align: "start" },
    { text: "Client", value: "displayId", align: "start" },
    { text: "Task", value: "taskName", align: "start" },
    { text: "", value: "priority" },
    { text: "Status", value: "taskState" },
    { text: "Allocated On", value: "allocatedTime" },
    //{ text: "Last Updated On", value: "lastUpdatedTime" },
    // { text: "Suspended", value: "isSuspended" },
    { text: "", value: "action", sortable: false },
  ];

  mounted() {
    // this.getAllocatedTaskList();
    this.getActiveTaskListAllocatedGrid();
  }

  getActiveTaskListAllocatedGrid() {
    Action.TaskList.GetActiveTaskListAllocated.execute((output) => {
      this.allocatedTaskList = output;
    });
  }

  startTask(value: any, item: Data.TaskList.AllocatedTaskGrid) {
    Action.TaskList.Start.execute1(item.taskId, (output) => {
      this.gotoTask(item);
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

  get taskAssignedToMeFDataTableMetaData() {
    return new TaskAssignedToMeFDataTableMDP({ parent: this }).getMetaData();
  }
}
</script>

<style></style>
