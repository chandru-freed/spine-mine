<template>
  <div>
      <div class="ma-2" :key="action.actionName" v-for="action in actionList">
      <v-btn outlined   @click="goto(action.routerName)">{{action.actionName}}</v-btn>
      </div>
  </div>

</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';

@Component
export default class CFActionList extends Vue {

  actionList = [
    {
      actionName: "Assign RM",
      routerName: "Root.CFile.CFAction.CFAssignRM",
    },
    {
      actionName: "Assign Sales Rep",
      routerName: "Root.CFile.CFAction.CFAssignSalesRep",
    }
  ];


  goto(routerName: string) {
    this.$router.push({ name: routerName })
  }
}

</script>

<style>
</style>
