<template>
  <div class="TaskAssignedToMe">
    <!-- TASK TAB -->
    <v-card class="pa-0 ma-0" color="transparent">
      <task-tab v-model="tab"></task-tab>

      <v-data-table
        :headers="toBePulledTaskGridHeaderList"
        :items="toBePulledTaskList"
        sort-by="calories"
        class="elevation-0"
        :search="search"
        v-model="selected"
        :single-select="false"
        show-select
        item-key="taskId"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-col class="col-2">
              <v-select
                :disabled="selected.length === 0"
                :items="['Delete', 'Edit', 'Send']"
                label="Bulk Actions"
                single-line
                hide-details
                outlined
                rounded
                dense
              ></v-select>
            </v-col>
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
        <template v-slot:item.cid="{ item }">
          <v-btn text color="secondary" @click="gotoFile(item)">
            {{ item.cid }}
          </v-btn>
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
          <v-btn outlined small color="primary" @click="pullTask('',item)">
            Pull
          </v-btn>
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

@Component({
  components: {
    "task-tab": TaskTab,
  },
})
export default class TaskAssignedToMe extends Vue {
  tab = 0;

  selected = [];
  search = "";

  toBePulledTaskList: Data.TaskList.ToBePulledTaskGrid[] = [];

  @Store.Getter.Login.LoginDetails.userName userName: string;

  toBePulledTaskGridHeaderList = [
    // { text: "Task Id", value: "taskId" },
    { text: "File Id", value: "cid", align: "start" },
    { text: "Display Id", value: "displayId", align: "start" },
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

  pullTask(value: any, item: Data.TaskList.ToBePulledTaskGrid) {
    Action.TaskList.PullTask.execute2(
      item.taskId,
      this.userName,
      (output) => {
        this.gotoTask(item)
      }
    );
  }

  gotoFile(item: any) {
    this.$router.push({
      name: "Root.ClientFile.ClientFileDetails",
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
