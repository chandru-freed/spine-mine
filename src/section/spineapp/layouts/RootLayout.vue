<template>
  <div>
    <f-confirmation />
    <!-- {{isAmeyoToolbarDialogRole()}} -->
    <!-- <left-navigation-bar></left-navigation-bar> -->

    <!-- <v-app-bar app dense  flat class="grey lighten-2">
      <v-spacer></v-spacer>
      <div class="mt-6 py-2">
        <v-text-field  flat placeholder="Quick Search" outlined rounded  dense append-icon="mdi-magnify"></v-text-field>
      </div>
      <app-bar-notification-menu/>
      <app-bar-user-menu/>
    </v-app-bar> -->

    <div
      :class="['sidenavBar', showAmeyoSideBar ? 'right0' : '']"
      v-if="isAmeyoToolbarDialogRole()"
    >
      <AmeyoToolbarDialog />
    </div>
    <div
      :class="['phoneCall', showAmeyoSideBar ? 'right0' : '']"
    >
      <v-btn
        color="green"
        dark
        fab
        @click="openNavShow()"
        v-if="isAmeyoToolbarDialogRole()"
      >
        <v-icon v-if="!showAmeyoSideBar">mdi-phone-in-talk</v-icon>
        <v-icon v-if="showAmeyoSideBar">mdi-close</v-icon>
      </v-btn>
    </div>
    <app-bar></app-bar>

    <!-- <v-main class="grey lighten-4" style="height: calc(100vh - 48px);"> -->
    <v-main class="grey lighten-4">
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="pa-0">
        <!-- If using vue-router -->
        <router-view :key="$route.fullPath"></router-view>
      </v-container>
    </v-main>

    <!-- <v-footer app>
      
    </v-footer> -->
  </div>

  <!-- <router-view /> -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppBar from "@/section/spineapp/views/bar/AppBar.vue";
import LeftNavigationBar from "@/section/spineapp/views/bar/LeftNavigationBar.vue";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import store, * as Store from "@/../src-gen/store";
import AmeyoToolbarDialog from "@/components/generic/ameyo/AmeyoToolbarDialog.vue";
import moment from "moment";
import Helper from "../util/Helper";
import FConfirmation from "@/components/generic/FConfirmation.vue";

@Component({
  components: {
    LeftNavigationBar,
    AmeyoToolbarDialog,
    AppBar,
    FConfirmation
  },
})
export default class RootLayout extends Vue {
  @Store.Getter.Login.LoginDetails.roleList
  roleList: string[];

  @Store.Getter.ClientFile.ClientFileSummary.showAmeyoSideBar
  showAmeyoSideBar: boolean;
  // showAmeyoSideBar: boolean = false;
  showHide: boolean = false;
  get clientFileId() {
    return this.$route.params.clientFileId;
  }
  mounted() {
    Store.Mutation.Spine.RouterStore.UPDATE_FLATTENED_ROUTER_LIST();
    this.getLoggedInUser();
    this.getMyClientFileList();
    this.getAllTaskList();
    this.getAllTicketList();
  }

  
  getAllTaskList() {
    this.getMyActiveTaskList();
    this.getMyCompletedTaskList();
    this.getMySuspendedTaskList();
  }

  getMyActiveTaskList() {
    Action.TaskList.GetActiveTaskListAllocated.execute((output) => {});
  }

  getMyCompletedTaskList() {
    const toDate = moment().format(Helper.DATE_FORMAT);
    const fromDate = moment().subtract(7, "d").format(Helper.DATE_FORMAT);
    Action.TaskList.GetCompletedTaskList.execute2(
      fromDate,
      toDate,
      (output) => {}
    );
  }


  getMySuspendedTaskList() {
    Action.TaskList.GetSuspendedTaskList.execute((output) => {});
  }


getAllTicketList() {
  this.getActiveTicketList();
  this.getCompletedTicketList();
  this.getSubscribedTicketList();
}


  getActiveTicketList() {
    Action.Ticket.GetMyTicketActiveList.execute(output => {})
  }

  getCompletedTicketList() {
    Action.Ticket.GetMyTicketCompletedList.execute(output => {})
  }

  getSubscribedTicketList() {
    Action.Ticket.GetMyTicketSubscribedList.execute(output => {})
  }

  getMyClientFileList() {
    Action.ClientFile.GetMyClientFileList.execute((output) => {});
  }
  getLoggedInUser() {
    const userName: any = localStorage.getItem("userName");
    Action.Login.GetUserDetails.execute1(userName, (output) => {
      this.getRoleListForUser();
    });
  }
  getRoleListForUser() {
    Action.Login.GetRoleListForUser.execute(
      new Data.Login.MyAppId(),
      (output: any) => {}
    );
  }

  isCS() {
    return this.roleList?.includes("CS");
  }

  isCSManager() {
    return this.roleList?.includes("CSManager");
  }

  isAmeyoToolbarDialogRole() {
    return this.isCS() || this.isCSManager();
  }

  openNavShow() {
    Store.Mutation.ClientFile.ClientFileSummary.TOGGLE_AMEYO_SIDE_BAR(
      !this.showAmeyoSideBar
    );
  }
}
</script>
<style scoped>
.v-application {
  font-family: "Inter", sans-serif !important;
}
.sidenavBar {
  position: fixed;
  top: 0;
  right: -500px;
  bottom: 0;
  z-index: 999;
  background: #fff;
  transition: 0.5s;
  z-index: 9999;
}
.sidenavBar.right0 {
  right: 0;
}
.phoneCall {
  position: fixed;
  bottom: 65px;
  right: 10px;
  transition: 0.5s;
  z-index: 999;
}
.phoneCall.right0 {
  right: 330px;
}
</style>
