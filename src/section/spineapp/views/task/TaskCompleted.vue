<template>
  <div class="TaskAssignedToMe">
    <v-card class="pa-0 ma-0" color="transparent">
      <task-tab v-model="tab"></task-tab>
      <!--  COMPLETED TASK -->
      <v-data-table
        :headers="completedTaskheaders"
        :items="completedTaskTList"
        class="elevation-0"
        :search="search"
        item-key="completedTaskId"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-col class="col-2"> </v-col>
            <v-col class="col-7"></v-col>
            <v-col>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search Item"
                single-line
                hide-details
                outlined
                rounded
                dense
                class="shrink"
              ></v-text-field>
            </v-col>
          </v-toolbar>
        </template>
        <template v-slot:item.cid="{ item }">
          <f-btn :label="item.cid" text color="secondary" :onClick="()=>gotoFile(item)"></f-btn>
        </template>
        <template v-slot:item.taskName="{ item }">
          <f-btn :label="item.taskName" text color="primary" :onClick="()=>gotoTask(item)"></f-btn>
        </template>
        <template v-slot:item.displayId="{ item }">
          <span class="overline">
            {{ item.displayId }}
          </span>
        </template>
        <template v-slot:item.startedTime="{ item }">
          <span class="grey--text">
            {{ item.startedTime | date-time }} ({{
              item.startedTime | fromNow
            }})
          </span>
        </template>

        <template v-slot:item.completedTime="{ item }">
          <span class="grey--text">
            {{ item.completedTime | date-time }} ({{
              item.completedTime | fromNow
            }})
          </span>
        </template>
      </v-data-table>
      <!--  COMPLETED TASK -->
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import TaskTab from "@/section/spineapp/components/task/TaskTab.vue";

import moment from "moment";
import Helper from "../../util/Helper";
import FBtn from "@/components/generic/FBtn.vue";

@Component({
  components: {
    "task-tab": TaskTab,
    "f-btn":FBtn
  },
})
export default class TaskCompleted extends Vue {
  completedTaskTList: Data.TaskList.CompletedTaskGrid[] = [];
  tab = 0;
  selected = [];
  search = "";
  searchDurationInDays = 7

  toDate = moment().format(Helper.DATE_FORMAT);
  fromDate = moment().subtract(this.searchDurationInDays, "d").format(Helper.DATE_FORMAT);

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
    this.$router.push({
      name: "Root.ClientFile.Workarea",
      params: { clientFileNumber: item.cid },
    });
  }

  gotoTask(item: any) {
    this.$router.push({
      name: "Root.ClientFile.FileTask.FileTaskDetails",
      params: { clientFileNumber: item.cid, taskId: item.taskId },
    });
  }
}
</script>

<style>
.f-btn {
  text-transform: unset !important;
}
</style>
