<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    color="primary"
    dark
    :mini-variant="mini"
    
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar @click="mini = !mini">
          <!-- <v-icon class="grey lighten-1 secondary--text"> mdi-folder </v-icon> -->
          <v-img src="@/assets/freed-small-logo.svg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title color="white">FREED</v-list-item-title>

          <!-- <v-list-item-subtitle dark>Sub text</v-list-item-subtitle> -->
        </v-list-item-content>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense dark>
      <v-list-item link @click="goto('Root.Home')">
        <v-list-item-icon>
          <v-icon>mdi-home-analytics</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <!-- <v-list-item link @click="$router.push({ name: 'Root.Dashboard' })">
        <v-list-item-icon>
          <v-icon>mdi-chart-box</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item> -->

      <v-list-item link @click="goto('Root.MyClientFiles')">
        <v-list-item-icon>
          <v-icon>mdi-file</v-icon>
        </v-list-item-icon>
        <v-list-item-title>My Client Files</v-list-item-title>
      </v-list-item>

      <v-list-item
        @click="goto('Root.TaskList.TaskAssignedToMe')"
      >
        <v-list-item-icon>
          <v-icon>mdi-marker-check</v-icon>
        </v-list-item-icon>
        <v-list-item-title>My Tasks</v-list-item-title>
      </v-list-item>


      <v-list-item @click="goto('Root.Search.ClientSearch')">
        <v-list-item-icon>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Search</v-list-item-title>
      </v-list-item>
      
      <!-- <v-list-item link @click="$router.push({ name: 'Root.Notification' })">
        <v-list-item-icon>
          <v-icon>mdi-bell</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Notification</v-list-item-title>
      </v-list-item> -->
    </v-list>
    <v-spacer vertical></v-spacer>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component({})
export default class LeftNavigationBar extends Vue {
  public drawer = true;
  public mini = true;

  goto(routerName: string) {
    this.$router.push({ name: routerName })
  }
}
</script>
<style scoped>
.v-application .primary--text {
  color: #f56f07 !important;
  caret-color: #f56f07 !important;
}
</style>
