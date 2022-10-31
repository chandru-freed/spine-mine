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
export default class CFActionLayout extends Vue {
  currentRouteName: string = this.$route.name as string;

  get selectedAction() {
    return this.actionList
      .map((tab) => tab.routerName)
      .indexOf(this.currentRouteName);
  }

  get selectedActionName() {
    return this.actionList
      .filter((tab) => tab.routerName === this.currentRouteName)
      .map((x) => x.actionName)[0];
  }

  actionList = [
    {
      actionName: "Create Flow",
      routerName: "Root.CFile.CFAction.CFCreateRequest",
    },
    {
      actionName: "Assign RM",
      routerName: "Root.CFile.CFAction.CFAssignRM",
    },
    {
      actionName: "Assign Sales Rep",
      routerName: "Root.CFile.CFAction.CFAssignSalesRep",
    },
    {
      actionName: "Email",
      routerName: "Root.CFile.CFAction.CFSendEmail",
    },
    {
      actionName: "SMS",
      routerName: "Root.CFile.CFAction.CFSendSMS",
    },
    {
      actionName: "Whatsapp",
      routerName: "Root.CFile.CFAction.CFSendWhatsapp",
    },
    {
      actionName: "Record",
      routerName: "Root.CFile.CFAction.CFRecordPayment",
    },
    {
      actionName: "Receive Payment",
      routerName: "Root.CFile.CFAction.CFReceivePayment",
    },
    {
      actionName: "Receive MSF",
      routerName: "Root.CFile.CFAction.CFReceiveMSFPayment",
    },
  ];

  breadcrumbList = [
    {
      title: "Actions",
      routerName: "Root.CFile.CFAction.CFActionList",
    },
    {
      title: this.selectedActionName,
    },
  ];

  goto(routerName: string) {
    this.$router.push({ name: routerName });
  }
}
</script>
