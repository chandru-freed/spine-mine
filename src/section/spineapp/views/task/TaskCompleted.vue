<template>
  <div class="TaskAssignedToMe">
    <v-card class="pa-0 ma-0" color="transparent">
      <task-tab v-model="tab"></task-tab>
      <!--  COMPLETED TASK -->
      <v-data-table
        :headers="toBeCompletedTaskheaders"
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
        <template v-slot:item.taskName="{ item }">
          <v-btn text color="primary" @click="gotoTask(item)">
            {{ item.taskName }}
          </v-btn>
        </template>
        <template v-slot:item.displayId="{ item }">
          <span class="overline">
            {{ item.displayId }}
          </span>
        </template>
      </v-data-table>
      <!--  COMPLETED TASK -->
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import TaskTab from "@/section/spineapp/components/task/TaskTab.vue";

import moment from "moment";


@Component({
  components: {
    "task-tab": TaskTab,
  },
})
export default class TaskCompleted extends Vue {
  completedTaskTList: Data.TaskList.CompletedTaskGrid[] = [];
  tab = 0;
  selected = [];
  search = "";
  fromDate = "2022-09-14";
  toDate = "2022-09-7";
  toBeCompletedTaskheaders = [
    { text: "Display Id", value: "displayId" },
    { text: "CID", value: "cid" },
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

  gotoTask(item: any) {
    this.$router.push({
      name: "Root.TaskList.Task.TaskDetails",
      params: { taskId: item.taskId },
    });
  }
}
</script>

<style>
.v-btn {
  text-transform: unset !important;
}
</style>
