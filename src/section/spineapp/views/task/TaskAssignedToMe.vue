<template>
  <div class="TaskAssignedToMe">
    <!-- TASK TAB -->
    <v-card class="pa-0 ma-0" color="transparent">
      <task-tab v-model="tab"></task-tab>

      <v-data-table
        :headers="allocatedTaskGridHeaderList"
        :items="allocatedTaskList"
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
        <template v-slot:item.taskState="{ item }">

        <v-icon color="grey" v-if="item.taskState === 'CREATED'"
          >mdi-plus-circle-outline</v-icon
        >
        <v-icon color="secondary" v-if="item.taskState === 'ALLOCATED'"
          >mdi-account-circle-outline</v-icon
        >
        <v-icon color="primary" v-if="item.taskState === 'STARTED'"
          >mdi-pencil-circle-outline</v-icon
        >
        <v-icon color="primary" v-if="item.taskState === 'SAVED'"
          >mdi-progress-pencil</v-icon
        >

        <v-icon color="success" v-if="item.taskState === 'COMPLETED'"
          >mdi-check-circle-outline</v-icon
        >

        <v-icon color="grey" v-if="item.taskState === 'CANCELLED'"
          >mdi-cancel</v-icon
        >
        <v-icon color="red" v-if="item.taskState === 'EXCEPTION_Q' || item.taskState === 'EXIT_Q'"
          >mdi-alert-circle</v-icon
        >
      </template>
      <template v-slot:item.priority="{ item }">
        <v-chip  small outlined>
          {{ item.priority }}
        </v-chip>
      </template>
        <template v-slot:item.taskName="{ item }">
          <f-btn :label="item.taskName" text color="primary" :onClick="()=>gotoTask(item)"></f-btn>
        </template>
        <template v-slot:item.cid="{ item }">
          <f-btn :label="item.cid" text color="secondary" :onClick="()=>gotoFile(item)"></f-btn>
        </template>
        <template v-slot:item.displayId="{ item }">
          <span class="overline">
            {{ item.displayId }}
          </span>
        </template>

        <template v-slot:item.allocatedTime="{ item }">
          <span class="grey--text">
            {{ item.allocatedTime | date-time }} ({{
              item.allocatedTime | fromNow
            }})
          </span>
        </template>

        <template v-slot:item.action="{ item }" >
          <f-btn label="START" v-if="item.taskState === 'ALLOCATED'" outlined small color="primary" :onClick="()=>startTask('', item)">   
          </f-btn>
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
export default class TaskAssignedToMe extends Vue {
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
    Action.TaskList.GetActiveTaskListAllocated.execute(
      (output) => {
        this.allocatedTaskList = output;
      }
    );
  }

  startTask(value: any, item: Data.TaskList.AllocatedTaskGrid) {
    Action.TaskList.Start.execute1(
      item.taskId,
      (output) => {
        this.gotoTask(item);
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
