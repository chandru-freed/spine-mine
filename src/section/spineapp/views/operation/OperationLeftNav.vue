<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    absolute
    expand-on-hover
    hide-overlay
  >
    <!-- <v-toolbar
      flat  
      @click="mini = !mini"
    >
      <v-icon color="secondary">
        mdi-file-account
      </v-icon>

      <v-btn small text class="font-weight-bold secondary--text text-body-1">{{clientFileBasicInfo.clientFileNumber}} </v-btn>

      <v-spacer></v-spacer>

    </v-toolbar> -->

    <v-list>
      <template v-for="(item, index) in filteredCfNavList">
        <v-list-group
          :key="item.title"
          :value="activeIndex===index"
          :prepend-icon="item.icon"
          no-action
          @click="goto(item.routerName)"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title >{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            :class="isActive(child.routerName)?'active':''"
            v-for="child in item.items"
            :key="child.title"
            @click="goto(child.routerName)"
          >
            <v-list-item-content>
              <v-list-item-title >{{child.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import RouterUtil from "@/router/RouterUtil";
@Component({})
export default class OperationLeftNav extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  fileSummary: Data.ClientFile.FileSummary;

  @Store.Getter.Login.LoginDetails.roleList
  loggedInUserRoleList: string[];

  cfNavList = [
    {
      title: "Payment",
      icon: "mdi-credit-card-outline - payment icon",
      items: [
        { title: "Upcoming Payments", routerName: "Root.Operation.Payment.UpcomingPayments" },
        { title: "Search Payments", routerName: "Root.Operation.Payment.SearchPayment" },
        { title: "Daywise Payment", routerName: "Root.Operation.Payment.DaywisePayment" },
        { title: "Pending Payment List", routerName: "Root.Operation.Payment.PendingPaymentList" },
        { title: "Account Balance", routerName: "Root.Operation.Payment.AccountBalance" },

      ],
    },

    {
      title: "Tasks",
      icon: "mdi-checkbox-marked-circle-outline",
      items: [
        { title: "Active Tasks", routerName: "Root.Operation.OPRActiveTaskList" },
      ],
    },

    {
      title: "Tickets",
      icon: "mdi-ticket-confirmation",
      items: [
        { title: "Active Tickets", routerName: "Root.Operation.OPRActiveTicketList" },
      ],
    },
  ];
  
  get filteredCfNavList() {
    const authorizedNavList = this.cfNavList.map((cfNav) => {
      const newAuthNav = {...cfNav};
      newAuthNav.items = newAuthNav.items.filter((nav: any) => {
        return RouterUtil.isAuthorizedRouter(nav.routerName, this.loggedInUserRoleList);
      });
      return newAuthNav;
    });
    return authorizedNavList.filter((authorizedNav) => authorizedNav.items.length > 0);
  }

  public drawer = true;
  public mini = true;

  get activeIndex() {
    return this.filteredCfNavList.findIndex(item =>  item.items.findIndex(subItem => subItem.routerName === this.$route.name)!==-1)
  }

  isActive(routerName: string) {
    return this.$route.name === routerName
  }

  goto(routerName: string) {
    if (routerName) {
      this.$router.push({ name: routerName });
    }
  }
}
</script>
<style scoped>
.v-application .primary--text {
  color: #f56f07 !important;
  caret-color: #f56f07 !important;
}

.active {
    color: #f56f07 !important;
}
</style>
