<template>
  <div class="TaskCompleted">
    <!-- TASK TAB -->
    <task-tab v-model="tab"></task-tab>
    <!-- TASK TAB -->
      <component
        v-if="!!taskCompletedFDataTableMetaData"
        :ref="taskCompletedFDataTableMetaData.myRefName"
        :is="taskCompletedFDataTableMetaData.componentName"
        :value="selectModel(completedTaskTList, undefined)"
        v-bind="taskCompletedFDataTableMetaData.props"
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
import TaskCompletedFDataTableMDP from "./TaskCompletedFDataTableMDP";
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
export default class TaskCompleted extends ModelVue {
  completedTaskTList: Data.TaskList.CompletedTaskGrid[] = [];
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

  mounted() {
    this.getCompletedTaskList();
  }

  getCompletedTaskList() {
    Action.TaskList.GetCompletedTaskList.execute2(
      this.fromDate,
      this.toDate,
      (output) => {
        this.completedTaskTList = output;
      }
    );
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

  get taskCompletedFDataTableMetaData() {
    return new TaskCompletedFDataTableMDP({ parent: this }).getMetaData();
  }
}
</script>

<style>
.f-btn {
  text-transform: unset !important;
}
</style>
