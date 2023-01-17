<template>
  <div class="TaskPool">
    <!-- TASK TAB -->
    <task-tab v-model="tab"></task-tab>
    <!-- TASK TAB -->

    <component
      v-if="!!taskPoolFDataTableMetaData"
      :ref="taskPoolFDataTableMetaData.myRefName"
      :is="taskPoolFDataTableMetaData.componentName"
      :value="selectModel(toBePulledTaskList, undefined)"
      v-bind="taskPoolFDataTableMetaData.props"
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
import TaskPoolFDataTableMDP from "./TaskPoolFDataTableMDP";
import ModelVue from "@/components/generic/ModelVue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FForm from "@/components/generic/form/FForm.vue";
import Helper from "../../util/Helper";

@Component({
  components: {
    "task-tab": TaskTab,
    "f-btn": FBtn,
    FDataTable,
    FForm,
  },
})
export default class TaskPool extends ModelVue {
  tab = 0;

  selected = [];
  search = "";

  toBePulledTaskList: Data.TaskList.TaskListByCid[] = [];

  @Store.Getter.Login.LoginDetails.userName userName: string;

  toBePulledTaskGridHeaderList = [
    // { text: "Task Id", value: "taskId" },
    { text: "File Number", value: "cid", align: "start" },
    { text: "Client", value: "displayId", align: "start" },
    { text: "Task", value: "taskName", align: "start" },
    { text: "Priority", value: "priority" },
    // { text: "Status", value: "taskStatus" },
    { text: "Ready On", value: "readyTime" },
    //{ text: "Last Updated On", value: "lastUpdatedTime" },
    // { text: "Suspended", value: "isSuspended" },
    { text: "Action", value: "action", sortable: false },
  ];

  mounted() {
    this.getToBePulledTaskList();
  }

  getToBePulledTaskList() {
    Action.TaskList.GetToBePulledTaskList.execute((output) => {
      this.toBePulledTaskList = output;
    });
  }

  pullStartAndMerge(value: any, item: Data.TaskList.ToBePulledTaskGrid) {
    Action.TaskList.PullStartAndMerge.execute1(item.taskId, (output) => {
      
    });
    this.gotoTask(item);
  }

  gotoFile(item: any) {
     Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: item.cid,
    });
  }

  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }

  gotoTask(item: any) {
    this.$router.push({
      name: "Root.ClientFile.FileTask.FileTaskDetails",
      params: { clientFileNumber: item.cid, taskId: item.taskId },
    });
  }

  get taskPoolFDataTableMetaData() {
    return new TaskPoolFDataTableMDP({ parent: this }).getMetaData();
  }
}
</script>

<style></style>
