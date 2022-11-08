<template>
  <div>
    <template v-if="selectedTabIndx >= 0">
      <!-- BREADCRUMBS -->
      <v-breadcrumbs :items="breadcrumbList" class="pa-0 pb-1 px-1">
        <template v-slot:item="{ item }">
          <v-btn small text class="pa-0" @click="goto(item.routerName)">{{
            item.title
          }}</v-btn>
        </template>
      </v-breadcrumbs>
      <!-- BREADCRUMBS -->
      <v-card flat min-height="600">
        <router-view></router-view>
      </v-card>
    </template>
    <template v-if="selectedTabIndx < 0">
      <router-view></router-view>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CFSettlementPlanLayout extends Vue {
  currentRouteName: string = this.$route.name as string;

  get selectedTabIndx() {
    return this.tabList
      .map((tab) => tab.routerName)
      .indexOf(this.currentRouteName);
  }

  get selectedTabName() {
    return this.tabList
      .filter((tab) => tab.routerName === this.currentRouteName)
      .map((x) => x.tabName)[0];
  }

  tabList = [
    {
      tabName: "Settlement Plan",
      routerName: "Root.CFile.CFSettlementPlan.CFSettlementPlanList",
    },
  ];

  breadcrumbList = [
    {
      title: "Settlement Plan",
      routerName: "Root.CFile.CFSettlementPlan.CFSettlementPlanList",
    },
  ];

  goto(routerName: string) {
    this.$router.push({ name: routerName });
  }
}
</script>
