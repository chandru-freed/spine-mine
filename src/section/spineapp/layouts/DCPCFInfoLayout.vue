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
      <v-toolbar flat dense color="grey lighten-2">
        <v-tabs
          :value="selectedTab"
          background-color="grey lighten-2"
          color="secondary"
          grow
          show-arrows
        >
          <v-tab
            v-for="item in tabList"
            :key="item.tabName"
            class="text-caption"
            @click="goto(item.routerName)"
          >
            {{ item.tabName }}
          </v-tab>
        </v-tabs>
      </v-toolbar>

      <v-card flat min-height="600">
        <router-view></router-view>
      </v-card>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DCPCFInfoLayout extends Vue {
  currentRouteName: string = this.$route.name as string;
  get selectedTab() {
    // const selectedTab = this.tabList.map(tab => tab.routerName).indexOf(this.currentRouteName);
    const currentRouteName = this.getExcactRouterNameWithMSF();
    return this.tabList.map((tab) => tab.routerName).indexOf(currentRouteName);
  }

  get selectedTabName() {
    return this.tabList
      .filter((tab) => tab.routerName === this.currentRouteName)
      .map((x) => x.tabName)[0];
  }

  getExcactRouterNameWithMSF() {
    let routerName = this.currentRouteName;
    if (this.currentRouteName === "Root.CFile.CFInfo.CFPaymentPlanMSFInfo") {
      routerName = "Root.CFile.CFInfo.CFPaymentPlanInfo";
    }
    return routerName;
  }

  tabList = [
    {
      tabName: "Info",
      routerName: "Root.DCPCFile.DCPCFInfo.DCPCFClientInfo",
    },
    {
      tabName: "Creditor",
      routerName: "Root.DCPCFile.DCPCFInfo.DCPCFCreditorInfo",
    },
    {
      tabName: "Budget",
      routerName: "Root.DCPCFile.DCPCFInfo.DCPCFBudgetInfo",
    },
    {
      tabName: "Profile ",
      routerName: "Root.DCPCFile.DCPCFInfo.DCPCFPersonalInfo",
    },
    {
      tabName: "Document",
      routerName: "Root.DCPCFile.DCPCFInfo.DCPCFDocumentInfo",
    },
    {
      tabName: "Agreement",
      routerName: "Root.DCPCFile.DCPCFInfo.DCPCFAgreementInfo",
    },
    {
      tabName: "Cashfree",
      routerName: "Root.DCPCFile.DCPCFInfo.DCPCFCashfreeInfo",
    },
  ];

  breadcrumbList = [
    {
      title: "File",
      routerName: "Root.DCPCFile.DCPCFInfo.DCPCFAgreementInfo",
    },
    {
      title: this.selectedTabName,
    },
  ];

  goto(routerName: string) {
    this.$router.push({ name: routerName });
  }
}
</script>
