<template>
  <div class="CFCompletedTickets">
    <v-card class="pa-0 ma-0" flat height="calc(100vh - 96px)">
      <v-data-table
        :headers="allocatedTicketTaskGridHeaderList"
        :items="myTicketTaskDetailsGet"
        class="elevation-0"
        item-key="taskId"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-card-title>My Subscribed Tickets</v-card-title>
            <v-spacer />
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
            <v-btn color="primary"
            @click="goToAddTicketPage"
            outlined>Raise a ticket </v-btn>
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
            {{ item.allocatedTime | datetime }} ({{
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
import store, * as Store from "@/../src-gen/store";

import FBtn from "@/components/generic/FBtn.vue";
@Component({
  components: {
    "f-btn": FBtn,
  },
})
export default class CFSubscribedTickets extends Vue {
  @Store.Getter.Ticket.TicketSummary.myTicketSubscribedList
  myTicketTaskDetailsGet: Data.Ticket.MyTicketTaskDetailsGet;

  search: string = "";


  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  allocatedTicketTaskGridHeaderList = [
    { text: "Ticket Number", value: "cid", align: "start" },
    { text: "Subject", value: "displayId", align: "start" },
    { text: "Priority", value: "priority" },
    { text: "Raised By", value: "raisedBy" },
    { text: "Allocated To", value: "allocatedTo" },
    { text: "Allocated On", value: "allocatedTime" },
  ];

  mounted() {
    this.getMyCFTicketCompletedList();
  }

  getMyCFTicketCompletedList() {
    Action.Ticket.GetMyCFTicketSubscribedList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  gotoTask(item: any) {
    this.$router.push({
      name: "Root.CFile.CFTicket.CFTicketDetails.CFTicketCommentList",
      params: { myTicketId: item.taskId},
    });
  }


  goToAddTicketPage() {
     this.$router.push({
      name: "Root.CFile.CFTicket.CFAddTicket",
    });
  }
}
</script>
