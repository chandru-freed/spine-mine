<template>
  <div class="TaskPool">
    <!-- TASK TAB -->
    <task-tab v-model="tab"></task-tab>
    <!-- TASK TAB -->
    <v-card class="pa-0 ma-0" flat height="calc(100vh - 96px)">
      <v-data-table
        :headers="toBePulledTaskGridHeaderList"
        :items="toBePulledTaskList"
        sort-by="calories"
        class="elevation-0"
        :search="search"
        item-key="taskId"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-card-title>Task To Be Pulled</v-card-title>
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
          <f-btn :label="item.taskName" text color="primary" :onClick="()=>gotoTask(item)"></f-btn>
        </template>
        <template v-slot:item.cid="{ item }">
          <f-btn :label="item.cid " text color="secondary" :onClick="()=>gotoFile(item)"></f-btn>
        </template>
        <template v-slot:item.displayId="{ item }">
          <span class="overline">
            {{ item.displayId }}
          </span>
        </template>

        <template v-slot:item.readyTime="{ item }">
          <span class="grey--text">
            {{ item.readyTime | date-time }} ({{
              item.readyTime | fromNow
            }})
          </span>
        </template>

        <template v-slot:item.action="{ item }">
          <f-btn label="START" outlined small color="primary" :onClick="()=>pullStartAndMerge('',item)"></f-btn>
        </template>
      </v-data-table>
    </v-card>
    <!--  TASK TAB -->
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
import FBtn from "@/components/generic/FBtn.vue";

@Component({
  components: {
    "task-tab": TaskTab,
    "f-btn":FBtn
  },
})
export default class TaskPool extends Vue {
  tab = 0;

  selected = [];
  search = "";

  toBePulledTaskList: Data.TaskList.ToBePulledTaskGrid[] = [];

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
    Action.TaskList.GetToBePulledTaskList.execute(
      (output) => {
        this.toBePulledTaskList = output;
      }
    );
  }

  pullStartAndMerge(value: any, item: Data.TaskList.ToBePulledTaskGrid) {
    Action.TaskList.PullStartAndMerge.execute1(item.taskId, (output) => {
      this.gotoTask(item);
    });
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

<style></style>
