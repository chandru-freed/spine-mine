<template>
  <v-tabs background-color="transparent" flat color="secondary" centered :value="activeTab">
    <v-tabs-slider></v-tabs-slider>
    
    <v-tab :active="activeTab === tabIndx" :disabled="activeTab === tabIndx" @click="$router.push({name: tab.routerName})" v-for="(tab, tabIndx) in tabList" :key="tab.tabName">
      {{tab.tabName}}
      <!-- <v-icon>mdi-phone</v-icon> -->
    </v-tab>


    
  </v-tabs>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';

@Component
export default class TaskTab extends Vue {

  activeTab = 0;

  tabList = [
    {
      tabName : "My Task",
      routerName: "Root.TaskList.TaskAssignedToMe"
    },
    {
      tabName : "Pool",
      routerName: "Root.TaskList.TaskPool"
    },
    {
      tabName : "Pinned",
      routerName: "Root.TaskList.TaskPinned"
    },
    {
      tabName : "Deferred",
      routerName: "Root.TaskList.TaskDeferred"
    },
    {
      tabName : "Completed",
      routerName: "Root.TaskList.TaskCompleted"
    }
  ]

 
  mounted() {
    const ret = this.tabList.map(tab => tab.routerName).indexOf(this.$route.name!)
    this.activeTab = ret
  }
}
</script>

<style scoped>

</style>
