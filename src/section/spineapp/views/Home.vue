<template>
  <v-container  fluid>
    <div class="row">
      <div
        v-for="(dashboardItem, index) in dashboardItemList"
        :key="'dashboard' + index"
        class="col-4"
      >
        <v-card min-height="200px" class="mx-auto d-flex flex-column" outlined>
          <v-list-item min-height="150px" three-line>
            <v-list-item-content class="col-6">
              <v-icon style="position:absolute;" size="30">{{dashboardItem.icon}}</v-icon>
              <a @click="dashboardItem.onClick">
                <v-list-item-title class="my-1 text-caption text-center">
                  {{ dashboardItem.title }}
                </v-list-item-title>
                <v-list-item-title class="my-1 text-h4 text-center">
                  {{ dashboardItem.countText }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption text-center"
                  >{{ dashboardItem.subTitle }}
                </v-list-item-subtitle>
              </a>
            </v-list-item-content>
            <v-divider vertical class="my-2 mx-2"/>
            <v-list-item-content>
              <a
                v-for="(subItem, index) in dashboardItem.subItemList"
                @click="subItem.onClick"
                :key="'subitem' + index"
                :class="`${subItem.color}--text`"
              >
                <v-list-item-title class="d-flex text-caption align-center">
                  {{ subItem.title }} <v-spacer />
                  <div class="text-h6 mx-5">
                    {{ subItem.count }}
                  </div>
                </v-list-item-title>
                <v-divider />
              </a>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>

      

      <!-- <div class="col-4">
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
      </div> -->

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
  @Store.Getter.ClientFile.MyClientFileStore.clientFileDashboardSummary
  clientFileDashboardSummary: Data.ClientFile.ClientFileDashboardSummary;

  @Store.Getter.TaskList.MyTaskStore.myTaskDashboardSummary
  myTaskDashboardSummary: Data.TaskList.MyTaskDashboardSummary;

  @Store.Getter.Ticket.TicketSummary.myTicketDashboardSummary
  myTicketDashboardSummary: Data.Ticket.MyTicketDashboardSummary;


  totalNumberOfCreditors: number = 0;
  

  get dashboardItemList(): any[] {
    return [
      {
        title: "My Client Files",
        countText: this.clientFileDashboardSummary.totalCount,
        subTitle: "Files",
        onClick: () => this.openClientFilesWithQuery(),
        icon:"mdi-file-outline",
        subItemList: [
          {
            title: "Active",
            count: this.clientFileDashboardSummary.activeCFCount,
            onClick: () => this.openClientFilesWithQuery("file_active"),
            color: "green"
          },
          {
            title: "Agreement Signed",
            count: this.clientFileDashboardSummary.agreementCFCount,
            onClick: () => this.openClientFilesWithQuery("file_agreement"),
            color: "primary"
          },
           {
            title: "On Hold",
            count: this.clientFileDashboardSummary.holdCFCount,
            onClick: () => this.openClientFilesWithQuery("file_hold"),
            color: "secondary"
          },
          {
            title: "Lead",
            count: this.clientFileDashboardSummary.leadCFCount,
            onClick: () => this.openClientFilesWithQuery("file_lead"),
            color: "secondary"
          },
        ],
      },
      {
        title: "Mandates",
        countText: `${
          this.clientFileDashboardSummary.msfEMandateEligibleCFCount
        } / ${this.clientFileDashboardSummary.totalCount}`,
        subTitle: "Total",
        onClick: () => {},
        icon:"mdi-credit-card-outline",
        subItemList: [
          {
            title: "Active",
            count: this.clientFileDashboardSummary.eMandateActiveCount,
            onClick: () => this.openClientFilesWithQuery("emandate_active"),
            color: "green"
          },
          {
            title: "Pending",
            count: this.clientFileDashboardSummary.eMandatePendingCount,
            onClick: () => this.openClientFilesWithQuery("emandate_pending"),
            color: "secondary"
          },
        ],
      },
      {
        title: "MSF",
        countText: `${
          this.clientFileDashboardSummary.msfEMandateEligibleCFCount
        } / ${this.clientFileDashboardSummary.totalCount}`,
        subTitle: "Total",
        onClick: () => {},
        icon:"mdi-cash-multiple",
        subItemList: [
          {
            title: "Paid",
            count: this.clientFileDashboardSummary.msfPaidCount,
            onClick: () => this.openClientFilesWithQuery("msf_paid"),
            color: "green"
          },
          {
            title: "Pending",
            count: this.clientFileDashboardSummary.msfPendingCount,
            onClick: () => this.openClientFilesWithQuery("msf_pending"),
            color: "secondary"
          },
        ],
      },

      {
        title: "My Tasks",
        countText: `${this.myTaskDashboardSummary.myTotalTaskCount }`,
        subTitle: "tasks",
        onClick: () => {},
        icon:"mdi-checkbox-marked-circle-outline",
        subItemList: [

          {
            title: "Completed",
            count: this.myTaskDashboardSummary.myCompletedTaskCount,
            onClick: () => this.gotoRouter('Root.TaskList.TaskCompleted'),
            color: "green"
          },
          {
            title: "Active",
            count: this.myTaskDashboardSummary.myActiveTaskCount,
            onClick: () => this.gotoRouter('Root.TaskList.TaskAssignedToMe'),
            color: "primary"
          },
          {
            title: "Suspended",
            count: this.myTaskDashboardSummary.mySuspendedTaskCount,
            onClick: () => this.gotoRouter('Root.TaskList.TaskSuspended'),
            color: "secondary"
          },
        ],
      },

      {
        title: "My Tickets",
        countText: `${this.myTicketDashboardSummary.myTotalTicketCount }`,
        subTitle: "tickets",
        onClick: () => {},
        icon:"mdi-ticket",
        subItemList: [

          {
            title: "Completed",
            count: this.myTicketDashboardSummary.myCompletedTicketCount,
            onClick: () => this.gotoRouter('Root.MyTicket.CompletedTicketList'),
            color: "green"
          },
          {
            title: "Active",
            count: this.myTicketDashboardSummary.myActiveTicketCount,
            onClick: () => this.gotoRouter('Root.MyTicket.ActiveTicketList'),
            color: "primary"
          },
          {
            title: "Subscribed",
            count: this.myTicketDashboardSummary.mySubscribedTicketCount,
            onClick: () => this.gotoRouter('Root.MyTicket.SubscribedTicketList'),
            color: "secondary"
          },
        ],
      },
    ];
  }
  mounted() {
    this.getTotalNumberOfCreditors();
  }


  gotoRouter(routerName: string, clientFileStatus?: string) {
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

  openClientFilesWithQuery(query?: string) {
    this.$router.push({
      name: "Root.MyClientFiles",
      query: { filter: query },
    });
  }
}
</script>

<style></style>
