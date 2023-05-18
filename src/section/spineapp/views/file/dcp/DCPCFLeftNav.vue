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
      <template v-for="item in filteredCfNavList">
        <v-list-group
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
          @click="goto(item.routerName)"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title> {{item.title}}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            @click="goto(child.routerName)"
          >
            <v-list-item-content>
              <v-list-item-title>{{child.title}}</v-list-item-title>
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
export default class DCPCFLeftNav extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  fileSummary: Data.ClientFile.FileSummary;

  @Store.Getter.Login.LoginDetails.roleList
  loggedInUserRoleList: string[];

  cfNavList = [
     {
      title: "Info",
      icon: "mdi-file-account",
      items: [
        { title: "Agreement", routerName: "Root.DCPCFile.DCPCFInfo.DCPCFAgreementInfo" },
      ],
    },
    
    {
      title: "Actions",
      icon: "mdi-gesture-double-tap",
      items: [
        { title: "List Item", routerName: "Root.DCPCFile.DCPCFAction.DCPCFActionList" },
      ],
    },

    {
      icon: "mdi-checkbox-marked-circle-outline",
      items: [
        { title: "Active", routerName: "Root.DCPCFile.DCPCFTask.CFActiveTasks" },
        {
          title: "Completed",
          routerName: "Root.DCPCFile.DCPCFTask.CFCompletedTasks",
        },
      ],
      title: "Task",
    },
    {
      title: "Ticket",
      icon: "mdi-ticket-confirmation",
      items: [
        { title: "Active", routerName: "Root.DCPCFile.DCPCFTicket.CFActiveTickets" },
        {
          title: "Completed",
          routerName: "Root.DCPCFile.DCPCFTicket.CFCompletedTickets",
        },
        {
          title: "Subscribed",
          routerName: "Root.DCPCFile.DCPCFTicket.CFSubscribedTickets",
        },
        { title: "Raise", routerName: "Root.DCPCFile.DCPCFTicket.CFAddTicket" },
      ],
    },
  ];
  
  get filteredCfNavList() {
    const authorizedNavList = this.cfNavList.map((cfNav) => {
      const newAuthNav = {...cfNav};
      newAuthNav.items = newAuthNav.items.filter((nav) => {
        return RouterUtil.isAuthorizedRouter(nav.routerName, this.loggedInUserRoleList);
      });
      return newAuthNav;
    });
    return authorizedNavList.filter((authorizedNav) => authorizedNav.items.length > 0);
  }

  public drawer = true;
  public mini = true;

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
</style>
