<template>
  <v-container fluid>
    <div class="row">
      <!-- <div class="col-12 px-6">
        <v-text-field
          label="Search Client"
          single-line
          filled
          rounded
        ></v-text-field>
      </div> -->
      <div class="col-4">
        <v-card
          class="mx-auto"
          outlined
          @click="gotoRouter('Root.MyClientFiles')"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">My Clients</div>
              <v-list-item-title class="text-h4 mb-1">
                {{ myDashboardSummary.myClientFileCount }}
              </v-list-item-title>
              <v-list-item-subtitle>Files Owned </v-list-item-subtitle>
              <!-- <v-list-item-title class="text-h6 mb-1" v-if="item.subHeading">
                {{ item.subHeading + " (" + item.subCount + ")" }}
              </v-list-item-title> -->
            </v-list-item-content>

            <v-list-item-avatar tile size="60">
              <v-icon size="60">mdi-file-account</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </div>

      <div class="col-4">
        <v-card
          class="mx-auto"
          outlined
          @click="gotoRouter('Root.TaskList.TaskAssignedToMe')"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">My Tasks</div>
              <v-list-item-title class="text-h4 mb-1">
                {{ myDashboardSummary.taskAssignedCount }} /
                {{ myDashboardSummary.taskCompletedToday }}
              </v-list-item-title>
              <v-list-item-subtitle
                >Assigned / Completed Today</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar tile size="60">
              <v-icon size="60">mdi-checkbox-marked-circle-outline</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </div>

      <div class="col-4">
        <v-card
          class="mx-auto"
          outlined
          @click="gotoRouter('Root.MyTicket.ActiveTicketList')"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">My Tickets</div>
              <v-list-item-title class="text-h4 mb-1">
                {{ myDashboardSummary.ticketActiveCount }} /
                {{ myDashboardSummary.ticketCompletedToday }}
              </v-list-item-title>
              <v-list-item-subtitle
                >Assigned / Completed Today</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar tile size="60">
              <v-icon size="60">mdi-ticket-confirmation</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </div>

      <div class="col-4">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">Emandate Status</div>

              <div class="row">
                <div class="col-4">
                  <v-list-item-title class="text-h4 mb-1">
                    <a @click="gotoRouter('Root.MyClientFilesActiveEmandate')"
                      >{{ myDashboardSummary.myClientFileActiveEmandateCount }}
                      <v-list-item-subtitle>Active </v-list-item-subtitle>
                    </a>
                  </v-list-item-title>
                </div>
                <div class="col-4">
                  <v-list-item-title class="text-h4 mb-1">
                    <a @click="gotoRouter('Root.MyClientFilesPendingEmandate')"
                      >{{
                        myDashboardSummary.pendingEmandateOfActiveClientsCount
                      }}
                      <v-list-item-subtitle>Pending </v-list-item-subtitle>
                    </a></v-list-item-title
                  >
                </div>
              </div>
            </v-list-item-content>

            <v-list-item-avatar tile size="60">
              <v-icon size="60">mdi-credit-card-outline</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </div>

      <div class="col-4">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">First MSF Status</div>

              <div class="row">
                <div class="col-4">
                  <v-list-item-title class="text-h4 mb-1">
                    <a @click="gotoRouter('Root.MyClientFiles', 'ACTIVE')"
                      >{{ myDashboardSummary.myClientFileActiveCount }}
                      <v-list-item-subtitle>MSF Paid </v-list-item-subtitle>
                    </a>
                  </v-list-item-title>
                </div>
                <div class="col-4">
                  <v-list-item-title class="text-h4 mb-1">
                    <a @click="gotoRouter('Root.MyClientFilesFMSFPending')"
                      >{{ myDashboardSummary.pendingFirstMSFCount }}
                      <v-list-item-subtitle>MSF Pending </v-list-item-subtitle>
                    </a>
                  </v-list-item-title>
                </div>
              </div>
            </v-list-item-content>

            <v-list-item-avatar tile size="60">
              <v-icon size="60">mdi-cash-multiple</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </div>

      <div class="col-4">
        <v-card
          class="mx-auto"
          outlined
          @click="gotoRouter('Root.Settlement.FiCreditorSettlementList')"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">My Settlement</div>
              <v-list-item-title class="text-h4 mb-1">
                {{ myDashboardSummary.settlementEligibleFiCreditorCount }}
              </v-list-item-title>
              <v-list-item-subtitle>Ready for Settlement</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="60">
              <v-icon size="60">mdi-handshake-outline</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </div>

      <div class="col-4">
        <v-card class="mx-auto" outlined @click="gotoRouter('Root.Amendments')">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">My Amendments</div>
              <v-list-item-title class="text-h4 mb-1">
                {{ myDashboardSummary.activeAmendments }}
              </v-list-item-title>
              <v-list-item-subtitle>Active </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar tile size="60">
              <v-icon size="60">mdi-clipboard-text-clock-outline</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </div>

      <div class="col-4">
        <v-card
          class="mx-auto"
          outlined
          @click="
            gotoRouter('Root.CreditorModule.StatisticsListForTopCreditors')
          "
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">Creditor Module</div>
              <v-list-item-title class="text-h4 mb-1">
                {{ totalNumberOfCreditors }}
              </v-list-item-title>
              <v-list-item-subtitle>Creditors </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar tile size="60">
              <v-icon size="60">mdi-clipboard-text-clock-outline</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </div>

      <!-- <div class="col-4">
        <v-card
          class="mx-auto"
          outlined
          @click="gotoRouter('Root.MISReports.UpcomingPayments')"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">MIS Reports</div>
              <v-list-item-title class="text-h4 mb-1"> 2 </v-list-item-title>
              <v-list-item-subtitle>Active </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar tile size="60">
              <v-icon size="60">mdi-chart-bar</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </div>
      <div class="col-4">
        <v-card
          class="mx-auto"
          outlined
          @click="gotoRouter('Root.Dashboard.DCPDashboard')"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">Dashboard</div>
              <v-list-item-title class="text-h4 mb-1"> 2 </v-list-item-title>
              <v-list-item-subtitle>Active </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar tile size="60">
              <v-icon size="60">mdi-view-dashboard</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </div> -->
    </div>
  </v-container>
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
  myDashboardSummary: Data.Spine.GetMyDashboardSummary =
    new Data.Spine.GetMyDashboardSummary();

  totalNumberOfCreditors: number = 0;
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
    this.getTotalNumberOfCreditors();
  }
  getMyDashboardSummary() {
    Action.Spine.GetMyDashboardSummary.execute((output) => {
      this.myDashboardSummary = output;
    });
  }

  gotoRouter(routerName: string, clientFileStatus: string) {
    this.$router.push({
      name: routerName,
      query: { clientFileStatus: clientFileStatus },
    });
  }

  getTotalNumberOfCreditors() {
    Action.Spine.SearchCreditor.execute1("", (output) => {
      this.totalNumberOfCreditors = output.length;
    });
  }
}
</script>

<style></style>
