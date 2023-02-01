<template>
  <div>
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
      v-if="clientFileId"
    >
      <AmeyoToolbarDialog />
    </div>
    <div
      :class="['phoneCall', showAmeyoSideBar ? 'right0' : '']"
      v-if="clientFileId"
    >
      <v-btn color="green" dark fab @click="openNavShow()">
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

@Component({
  components: {
    LeftNavigationBar,
    AmeyoToolbarDialog,
    AppBar,
  },
})
export default class RootLayout extends Vue {
  @Store.Getter.Login.LoginDetails.roleList
  roleList: [];

  @Store.Getter.ClientFile.ClientFileSummary.showAmeyoSideBar
  showAmeyoSideBar: boolean;

  showHide: boolean = false;
  get clientFileId() {
    return this.$route.params.clientFileId;
  }
  mounted() {
    Store.Mutation.Spine.RouterStore.UPDATE_FLATTENED_ROUTER_LIST();
    this.getLoggedInUser();
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
  bottom: 15px;
  right: 10px;
  transition: 0.5s;
  z-index: 999;
}
.phoneCall.right0 {
  right: 330px;
}
</style>

