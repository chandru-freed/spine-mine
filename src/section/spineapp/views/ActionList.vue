<template>
  <div>
    <div v-if="useAsDropDown">
      <v-autocomplete
        outlined
        hide-details
        dense
        class="mx-0"
        :search-input="searchText"
        @update:search-input="(newVal) => (searchText = newVal)"
        :items="actionListForAutoComplete"
        item-text="actionName"
        label="Select Actions"
        :hide-no-data="true"
      >
        <template v-slot:item="data">
          <v-card-text @click="takeAction(data.item)" class="row" small
            >{{ data.item.actionName }} <v-spacer />
            <v-icon small> mdi-chevron-right</v-icon></v-card-text
          >
        </template>
      </v-autocomplete>
    </div>
    <v-card v-else flat class="py-4">
      <v-container>
        <v-text-field
          outlined
          class="mx-5"
          rounded
          label="Search"
          dense
          v-model="searchText"
          prepend-inner-icon="mdi-magnify"
        />
        <div class="row mx-4">
          <div
            class="col-md-4"
            v-for="(actionGroup, i) in filteredActionGroupList"
            :key="i"
          >
            <v-card outlined color="grey lighten-3">
              <v-card-subtitle class="px-2 py-1 overline">{{
                actionGroup.groupName
              }}</v-card-subtitle>
              <v-list dense class="py-0">
                <v-list-item
                  v-for="(actionItem, j) in actionGroup.actionList"
                  :key="j"
                  @click="takeAction(actionItem)"
                >
                  <!-- <v-list-item-icon >
                  <v-icon v-if="actionItem.icon" v-text="actionItem.icon"></v-icon>
                </v-list-item-icon> -->

                  <v-list-item-content class="pa-0">
                    <v-list-item-title>{{
                      actionItem.actionName
                    }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon
                      small
                      v-if="actionItem.icon"
                      v-text="actionItem.icon"
                    ></v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </div>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import Helper from "@/section/spineapp/util/Helper";
import * as Snackbar from "node-snackbar";
import FSnackbar from "@/fsnackbar";
import RouterUtil from "@/router/RouterUtil";

@Component
export default class ActionList extends Vue {
  @Prop({
    default: false,
  })
  useAsDropDown: boolean;

  @Store.Getter.Login.LoginDetails.roleList
  loggedInUserRoleList: string[];

  searchText: string = "";

  actionGroupList = [
    {
      groupName: "Sales",
      actionList: [
        {
          actionName: "Daily Sales",
          icon: "mdi-chevron-right",
          routerName: "Report.SalesReport.DailySalesReport",
        },
        {
          actionName: "DCP",
          icon: "mdi-chevron-right",
          routerName: "Root.Dashboard.DCPDashboard",
        },
        {
          actionName: "DRP",
          icon: "mdi-chevron-right",
          routerName: "Root.Dashboard.DRPDashboard",
        },
        {
          actionName: "Active Partners",
          icon: "mdi-chevron-right",
          routerName: "Root.Dashboard.ActivePartnerList",
        },
        {
          actionName: "Requested Partners",
          icon: "mdi-chevron-right",
          routerName: "Root.Dashboard.RequestedPartnerList",
        },
        
      ],
    },
    {
      groupName: "Payment ",
      actionList: [
        {
          actionName: "Upcoming Payments",
          icon: "mdi-chevron-right",
          routerName: "Root.Operation.Payment.UpcomingPayments",
        },
        {
          actionName: "Account Balance",
          icon: "mdi-chevron-right",
          routerName: "Root.Operation.Payment.AccountBalance",
        },
        {
          actionName: "Search Payments",
          icon: "mdi-chevron-right",
          routerName: "Root.Operation.Payment.SearchPayment",
        },
        {
          actionName: "Daywise Payment",
          icon: "mdi-chevron-right",
          routerName: "Root.Operation.Payment.DaywisePayment",
        },
           {
          actionName: "Pending Payment List",
          icon: "mdi-chevron-right",
          routerName: "Root.Operation.Payment.PendingPaymentList",
        },
      ],
    },
    {
      groupName: "Operations",
      actionList: [
        {
          actionName: "Active Tasks",
          icon: "mdi-chevron-right",
          routerName: "Root.Operation.OPRActiveTaskList",
        },
        {
          actionName: "Active Tickets",
          icon: "mdi-chevron-right",
          routerName: "Root.Operation.OPRActiveTicketList",
        },
        {
          actionName: "Search Files",
          icon: "mdi-chevron-right",
          routerName: "Root.Operation.OPRClientFile.OPRClientFileSearch",
        },
        {
          actionName: "Unassigned Files",
          icon: "mdi-chevron-right",
          routerName: "Root.Operation.OPRClientFile.OPRUnAssignedCFSearch",
        },
        {
          actionName: "Accounts nearing settlement",
          icon: "mdi-chevron-right",
          routerName: "Root.Operation.OPRSettlement.OPRCreditorSettlementList",
        },
        {
          actionName: "Amendments",
          icon: "mdi-chevron-right",
          routerName: "Root.Operation.OPRAmendments",
        },
        
        
        // {
        //   actionName: "Payment Operation",
        //   icon: "mdi-chevron-right",
        //   routerName: "Root.Operation.PaymentOperation",
        // },
        // {
        //   actionName: "Pending Payment List",
        //   icon: "mdi-chevron-right",
        //   routerName: "Root.Operation.Payment.PendingPaymentList",
        // },
        // {
        //   actionName: "Daywise Payment",
        //   icon: "mdi-chevron-right",
        //   routerName: "Root.Operation.Payment.DaywisePayment",
        // },
      ],
    },
    {
      groupName: "Admin",
      actionList: [
        // {
        //   actionName: "Create User",
        //   icon: "mdi-chevron-right",
        //   routerName: "Root.Admin.Gompa.CreateUser",
        // },
        {
          actionName: "Inhouse Users",
          icon: "mdi-chevron-right",
          routerName: "Root.Admin.Gompa.UserList",
        },
        
      ],
    },

    {
      groupName: "Creditor Module",
      actionList: [
        {
          actionName: "Top Creditors",
          icon: "mdi-chevron-right",
          routerName: "Root.CreditorModule.StatisticsListForTopCreditors",
        },

        {
          actionName: "Settled Creditors",
          icon: "mdi-chevron-right",
          routerName: "Root.Settlement.FiCreditorSettledList",
        },

        

        
      ],
    },
     {
      groupName: "Master",
      actionList: [
        {
          actionName: "Add Creditor",
          icon: "mdi-chevron-right",
          routerName: "Root.Admin.Master.AddCreditorToMaster",
        },

        
      ],
    },
    {
      groupName: "Utility",
      actionList: [
        {
          actionName: "Spine Dump Link",
          icon: "mdi-chevron-right",
          routerName: "Root.Admin.Master.SpineDumpLink",
        },

        
      ],
    },
    // {
    //   groupName: "Creditor",
    //   actionList: [
    //     {
    //       actionName: "Agent List",
    //       icon: "mdi-chevron-right",
    //       routerName: "Root.CreditorModule.Agency.AgentList",
    //     },
        
        
    //   ],
    // },
    
  ];

  get getActionList() {
    let flattenedList: any[] = this.actionGroupList.map((actionGroup) => {
      return actionGroup.actionList.map((action) => {
        return { ...action, groupName: actionGroup.groupName };
      });
    });
    return [].concat(...flattenedList);
  }

  mounted() {}

  takeAction(actionItem: any) {
    this.searchText = "";
    if (actionItem.routerName) {
      this.goto(actionItem.routerName, actionItem.query);
    }

    if (actionItem.command) {
      actionItem.command();
    }
  }

  goto(routerName: string, query: any) {
    this.$router.push({ name: routerName, query: query });
  }

  get filteredActionGroupList() {
    const filteredValList = this.actionGroupList
      .map((actionGroup) => {
        let ag = { ...actionGroup };
        ag.actionList = (ag.actionList as any).filter(
          (action: any) =>
            action.actionName
              .toLowerCase()
              .includes(this.searchText.toLowerCase()) &&
            RouterUtil.isAuthorizedRouter(
              action.routerName,
              this.loggedInUserRoleList
            )
        );
        return ag;
      })
      .filter((item) => item.actionList.length > 0);
    return filteredValList;
  }

  get actionListForAutoComplete() {
    let actionsList: any = [];
    this.actionGroupList.map((item) => {
      actionsList.push(...item.actionList);
    });
    const filteredValList =
      this.searchText?.length > 1
        ? actionsList.filter((action: any) =>
            action.actionName
              .toLowerCase()
              .includes(this.searchText.toLowerCase())
          )
        : [];
    return filteredValList;
  }
}
</script>

<style></style>
