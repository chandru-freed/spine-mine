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

@Component({
  components: {
    LeftNavigationBar,
    AppBar,
  },
})
export default class RootLayout extends Vue {
  @Store.Getter.Login.LoginDetails.roleList
  roleList: [];
  mounted() {
    this.getLoggedInUser()
  }
  getLoggedInUser() {
    const userName: any = localStorage.getItem("userName");
    Action.Login.GetUserDetails.execute1(userName, (output) => {
      this.getRoleListForUser();
    });
  }
  getRoleListForUser() {
    Action.Login.GetRoleListForUser.execute(new Data.Login.MyAppId(), (output: any) => {
          
    })
  }
  
}
</script>
<style scoped>
.v-application {
    font-family: "Inter", sans-serif !important;
}
</style>
