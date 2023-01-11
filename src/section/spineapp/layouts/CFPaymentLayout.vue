
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

      <v-card outlined height="1000px">
        <v-toolbar flat dense color="grey lighten-2">
          <v-tabs
            :value="selectedTabIndx"
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
    </template>

    <template v-if="selectedTabIndx < 0">
      <router-view></router-view>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CFTicketLayout extends Vue {
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
      tabName: "Payment",
      routerName: "Root.CFile.CFPayment.CFPaymentList",
    },
    {
      tabName: "Transaction",
      routerName: "Root.CFile.CFPayment.CFTransactionList",
    },
    {
      tabName: "EMandate",
      routerName: "Root.CFile.CFPayment.CFEMandateList",
    },
  ];

  breadcrumbList = [
    {
      title: "Accounting",
      routerName: "Root.CFile.CFPayment.CFPaymentList",
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

