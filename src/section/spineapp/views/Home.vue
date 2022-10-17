<template>
  <div class="Home container">
    <div class="row">
      <!-- <div class="col-12 px-6">
        <v-text-field
          label="Search Client"
          single-line
          filled
          rounded
        ></v-text-field>
      </div> -->
      <div class="col-4" >
        <v-card class="mx-auto" max-width="344" outlined  @click="gotoRouter('Root.MyClientFiles')">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">My Clients</div>
              <v-list-item-title class="text-h4 mb-1">
                {{myDashboardSummary.myClientFileCount}}
              </v-list-item-title>
              <v-list-item-subtitle
                >Files Owned</v-list-item-subtitle
              >
              <!-- <v-list-item-title class="text-h6 mb-1" v-if="item.subHeading">
                {{ item.subHeading + " (" + item.subCount + ")" }}
              </v-list-item-title> -->
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="60"
            >
            <v-icon size="60">mdi-file</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </div>

      <div class="col-4" >
        <v-card class="mx-auto" max-width="344" outlined  @click="gotoRouter('Root.TaskList.TaskAssignedToMe')">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">My Tasks</div>
              <v-list-item-title class="text-h4 mb-1">
                {{myDashboardSummary.taskAssignedCount}} / {{myDashboardSummary.taskCompletedToday}}
              </v-list-item-title>
              <v-list-item-subtitle
                >Assigned / Completed Today</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="60"
            >
            <v-icon size="60">mdi-marker-check</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </div>

      <div class="col-4" >
        <v-card class="mx-auto" max-width="344" outlined  @click="gotoRouter('Root.MyTicket.ActiveTicketList')">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">My Tickets</div>
              <v-list-item-title class="text-h4 mb-1">
                {{myDashboardSummary.ticketActiveCount}}  /  {{myDashboardSummary.ticketCompletedToday}}
              </v-list-item-title>
              <v-list-item-subtitle
                >Assigned  / Completed Today</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="60"
            >
            <v-icon size="60">mdi-ticket-confirmation</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </div>
     
      
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import FSwitch from "@/components/generic/form/field/FSwitch.vue";
import FBtn from "@/components/generic/FBtn.vue";

@Component({
  components: {
    FSwitch,
    "f-btn": FBtn,
  },
})
export default class Home extends Vue {
  myDashboardSummary: any = {};
  get items() {
    return [
      {
        title: "My Client",
        heading: "Client File",
        count: this.myDashboardSummary.myClientFileCount,
        btnName: "My Client file",
        routerName: "Root.MyClientFiles",
      },
      {
        title: "My Task",
        heading: "Assign Task",
        count: this.myDashboardSummary.taskAssignedCount,
        subHeading: "Completed Task",
        subCount: this.myDashboardSummary.taskCompletedToday,
        btnName: "My Task",
        routerName: "Root.TaskList.TaskAssignedToMe",
      },
      {
        title: "My Ticket",
        heading: "Active Ticket",
        count: this.myDashboardSummary.ticketActiveCount,
        subHeading: "Completed Ticket",
        subCount: this.myDashboardSummary.ticketCompletedToday,
        btnName: "My Ticket",
        routerName: "Root.MyTicket.ActiveTicketList",
      },
    ];
  }
  mounted() {
    this.getMyDashboardSummary();
  }
  getMyDashboardSummary() {
    Action.Spine.GetMyDashboardSummary.execute((output) => {
      this.myDashboardSummary = output;
    });
  }

  gotoRouter(routerName: string) {
    console.log(routerName);
    this.$router.push({ name: routerName });
  }
}
</script>

<style>
</style>
