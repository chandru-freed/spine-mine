<template>
  <div>
    <left-navigation-bar></left-navigation-bar>

    <!-- <v-app-bar app dense  flat class="grey lighten-2">
      <v-spacer></v-spacer>
      <div class="mt-6 py-2">
        <v-text-field  flat placeholder="Quick Search" outlined rounded  dense append-icon="mdi-magnify"></v-text-field>
      </div>
      <app-bar-notification-menu/>
      <app-bar-user-menu/>
    </v-app-bar> -->
    <app-bar></app-bar>

    <v-main class="grey lighten-4">
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="pa-0">
        <!-- If using vue-router -->
        <router-view></router-view>
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
@Component({
  components: {
    LeftNavigationBar,
    AppBar,
  },
})
export default class RootLayout extends Vue {
  mounted() {
    this.getLoggedInUser()
  }
  getLoggedInUser() {
    const userName: any = localStorage.getItem("userName");
    Action.Login.GetUserDetails.execute1(userName, (output) => {
      
    });
  }
}
</script>
