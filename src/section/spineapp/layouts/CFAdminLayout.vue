
<template>
  <div>

    <!-- BREADCRUMBS -->
    <v-breadcrumbs :items="breadcrumbList" class="pa-0 pb-1 px-1">
      <template v-slot:item="{ item }">
        <v-btn small text class="pa-0" @click="goto(item.routerName)">{{item.title}}</v-btn>
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
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CFAdminLayout extends Vue {
  currentRouteName: string = this.$route.name as string
  get selectedTab() {
    return this.tabList.map(tab => tab.routerName).indexOf(this.currentRouteName)
  }

  get selectedTabName() {
    return this.tabList.filter(tab => tab.routerName === this.currentRouteName).map(x => x.tabName)[0]
  }

  tabList = [
    {
      tabName: "Profile",
      routerName: "Root.CFile.CFAdmin.CFAdminPersonalInfo",
    },
    {
      tabName: "Creditor",
      routerName: "Root.CFile.CFAdmin.CFAdminCreditorInfo",
    },
    {
      tabName: "Budget",
      routerName: "Root.CFile.CFAdmin.CFAdminBudgetInfo",
    },
    {
      tabName: "Payment Plan",
      routerName: "Root.CFile.CFAdmin.CFAdminPaymentPlanInfo",
    },
    // {
    //   tabName: "Bank",
    //   routerName: "Root.CFile.CFAdmin.CFAdminBankInfo",
    // },
    {
      tabName: "Document",
      routerName: "Root.CFile.CFAdmin.CFAdminDocumentInfo",
    },
  ];

  breadcrumbList =  [
    {
      title: 'Admin',
      routerName: "Root.CFile.CFAdmin.CFAdminPersonalInfo",
    },
    {
      title: this.selectedTabName,
    },
  ]


  goto(routerName: string) {
    this.$router.push({ name: routerName })
  }
}
</script>

