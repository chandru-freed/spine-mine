<template>
  <div>
    <!-- BREADCRUMBS -->
    <v-breadcrumbs :items="breadcrumbList" class="pa-0 pb-1 px-1">
      <template v-slot:item="{ item }">
        <v-btn small text class="pa-0" @click="goto(item.routerName)">{{
          item.title
        }}</v-btn>
      </template>
    </v-breadcrumbs>
    <!-- BREADCRUMBS -->
    <v-card outlined height="1000px">
      <v-card flat min-height="600">
        <router-view></router-view>
      </v-card>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CFSettlementPlanInfoLayout extends Vue {
  currentRouteName: string = this.$route.name as string;

  breadcrumbList = [
    {
      title: "Settlement Plan",
      routerName: "Root.CFile.CFSettlementPlan.CFSettlementPlanList",
    },
    {
      title: "Details",
    },
  ];

  goto(routerName: string) {
    this.$router.push({ name: routerName });
  }
}
</script>
