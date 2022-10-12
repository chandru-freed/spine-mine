<template>
  <div class="TaskAssignedToMe">
    <!-- TASK TAB -->
    <v-card class="pa-0 ma-0" color="transparent">
      <task-tab v-model="tab"></task-tab>
      <v-data-table
        :headers="allocatedTicketTaskGridHeaderList"
        :items="myTicketTaskList"
        class="elevation-0"
        item-key="taskId"
        :search="search"
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

        <template v-slot:[`item.priority`]="{ item }">
          <v-chip small outlined>
            {{ item.priority }}
          </v-chip>
        </template>
        <template v-slot:[`item.taskName`]="{ item }">
          <f-btn
            :label="item.taskName"
            text
            color="primary"
            :onClick="() => gotoTask(item)"
          ></f-btn>
        </template>
        <template v-slot:[`item.cid`]="{ item }">
          <f-btn
            :label="item.cid"
            text
            color="secondary"
            :onClick="() => gotoTask(item)"
          ></f-btn>
        </template>
        <template v-slot:[`item.displayId`]="{ item }">
          <span class="overline">
            {{ item.displayId }}
          </span>
        </template>

        <template v-slot:[`item.allocatedTime`]="{ item }">
          <span class="grey--text">
            {{ item.allocatedTime | (date - time) }} ({{
              item.allocatedTime | fromNow
            }})
          </span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";

import TaskTab from "../../components/task/TaskTab.vue";
import FBtn from "@/components/generic/FBtn.vue";
@Component({
  components: {
    "task-tab": TaskTab,
    "f-btn": FBtn,
  },
})
export default class TicketAssignedToMe extends Vue {
  tab: number = 3;

  myTicketTaskList: Data.Ticket.MyTicketTaskDetails[] = [];

  allocatedTicketTaskGridHeaderList = [
    // { text: "Task Id", value: "taskId" },
    { text: "Ticket Number", value: "cid", align: "start" },
    { text: "Subject", value: "displayId", align: "start" },
    // { text: "Task", value: "taskName", align: "start" },
    { text: "Priority", value: "priority" },
    { text: "Raised By", value: "raisedBy" },
    { text: "Allocated To", value: "allocatedTo" },
    { text: "Allocated On", value: "allocatedTime" },
    //{ text: "Last Updated On", value: "lastUpdatedTime" },
    // { text: "Suspended", value: "isSuspended" },
    // { text: "", value: "action", sortable: false },
  ];

  mounted() {
    this.getMyTicketTaskList();
  }
  getMyTicketTaskList() {
    Action.Ticket.GetMyTicketTaskList.execute((output) => {
      this.myTicketTaskList = output;
    });
  }

  gotoTask(item: any) {
    this.$router.push({
      name: "Root.TaskList.Ticket.TicketDetails",
      params: { taskId: item.taskId, ticketNumber: item.cid },
    });
  }
}
</script>
