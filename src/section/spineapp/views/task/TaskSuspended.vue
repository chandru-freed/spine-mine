<template>
  <div class="TaskCompleted">
    <!-- TASK TAB -->
    <task-tab v-model="tab"></task-tab>
    <!-- TASK TAB -->
    <component
      v-if="!!taskSuspendedFDataTableMetaData"
      :ref="taskSuspendedFDataTableMetaData.myRefName"
      :is="taskSuspendedFDataTableMetaData.componentName"
      :value="selectModel(suspendedTaskList, undefined)"
      v-bind="taskSuspendedFDataTableMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import TaskTab from "@/section/spineapp/components/tab/TaskTab.vue";

import moment from "moment";
import Helper from "../../util/Helper";
import FBtn from "@/components/generic/FBtn.vue";
import TaskSuspendedFDataTableMDP from "./TaskSuspendedFDataTableMDP";
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
export default class TaskSuspended extends ModelVue {
  suspendedTaskList: Data.TaskList.SuspendedTaskAllocated[] = [];
  tab = 0;
  selected = [];
  search = "";
  searchDurationInDays = 7;

  toDate = moment().format(Helper.DATE_FORMAT);
  fromDate = moment()
    .subtract(this.searchDurationInDays, "d")
    .format(Helper.DATE_FORMAT);

  completedTaskheaders = [
    { text: "File Number", value: "cid" },
    { text: "Client", value: "displayId" },
    { text: "Task Name", value: "taskName" },
    { text: "Started Time", value: "startedTime" },
    { text: "Completed Time", value: "completedTime" },
  ];

    public getSuspendedTaskListWithDelayHandler = (output: any) => {
    setTimeout(() => {
      this.getSuspendedTaskList();
    }, 1000);
  };

  mounted() {
    this.getSuspendedTaskList();
    Action.TaskList.Resume.interested(this.getSuspendedTaskListWithDelayHandler);
  }

    destroyed() {
    Action.TaskList.Resume.notInterested(this.getSuspendedTaskListWithDelayHandler);
  }

  getSuspendedTaskList() {
    Action.TaskList.GetSuspendedTaskList.execute((output) => {
      this.suspendedTaskList = output;
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
      name: "Root.ClientFile.FileTask.FileTaskDetails",
      params: { clientFileNumber: item.cid, taskId: item.taskId },
    });
  }

  get taskSuspendedFDataTableMetaData() {
    return new TaskSuspendedFDataTableMDP({ parent: this }).getMetaData();
  }
}
</script>

<style>
.f-btn {
  text-transform: unset !important;
}
</style>
