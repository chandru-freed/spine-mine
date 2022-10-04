<template>
  <div class="navigation-drawer-left">
    <v-navigation-drawer
      absolute
      permanent
      :width="leftFocused ? '100%' : '49%'"
      v-if="!rightFocused"
      :temporary="leftFocused"
      overlay-color="transparent"
      overlay-opacity="0"
    >
      <template v-slot:prepend>
        <v-toolbar flat dense color="grey lighten-2">
          <v-btn icon v-if="!leftFocused" @click="focusLeft">
            <v-icon>mdi-checkbox-blank-circle-outline</v-icon>
          </v-btn>
          <v-btn icon v-if="leftFocused" @click="resumeNormal">
            <v-icon>mdi-circle-slice-8</v-icon>
          </v-btn>
          <v-tabs
            v-model="fileDetailsTab"
            background-color="grey lighten-2"
            color="secondary"
            grow
          >
            <v-tab
              v-for="item in fileDetailsTabList"
              :key="item.tabName"
              class="text-caption"
            >
              {{ item.tabName }}
            </v-tab>
          </v-tabs>
        </v-toolbar>
      </template>

      <v-divider></v-divider>

      <v-tabs-items v-model="fileDetailsTab" flat>
        <v-tab-item v-for="item in fileDetailsTabList" :key="item.tabName">
          <v-card flat min-height="700">
            <component :is="item.component"></component>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';
import FileInfo from "@/section/spineapp/components/file/FileInfo.vue";
import FileProfile from "@/section/spineapp/components/file/profile/FileProfile.vue";
import FileBank from "@/section/spineapp/components/file/bank/FileBank.vue";
import FileBudget from "@/section/spineapp/components/file/budget/FileBudget.vue";
import FileCreditorList from "@/section/spineapp/components/file/creditor/FileCreditorList.vue";
import FileDocumentList from "../../components/file/document/FileDocumentList.vue";
import FilePaymentPlan from "../../components/file/paymentplan/FilePaymentPlan.vue";
import Payment from "../../components/file/payment/Payment.vue";

@Component({
  components: {
    "file-info": FileInfo,
    "file-profile": FileProfile,
    "file-bank": FileBank,
    "file-budget": FileBudget,
    "file-creditor-list": FileCreditorList,
    "file-payment-plan": FilePaymentPlan,
    "file-document-list": FileDocumentList,
    payment: Payment,
  },
})
export default class FileDetails extends Vue {
  clientfileNumber = this.$route.params.clientFileNumber;

  leftFocused = false;
  rightFocused = false;

  fileDetailsTab = 0;
  fileDetailsTabList = [
    {
      tabName: "Info",
      component: "file-info",
    },
    {
      tabName: "Profile",
      component: "file-profile",
    },
    {
      tabName: "Creditor",
      component: "file-creditor-list",
    },
    {
      tabName: "Budget",
      component: "file-budget",
    },
    {
      tabName: "Payment Plan",
      component: "file-payment-plan",
    },
    {
      tabName: "Bank",
      component: "file-bank",
    },
    {
      tabName: "Document",
      component: "file-document-list",
    },
    {
      tabName: "Payment",
      component: "payment",
    },
  ];

  focusLeft() {
    this.leftFocused = true;
    this.rightFocused = !this.leftFocused;
  }

  resumeNormal() {
    this.leftFocused = false;
    this.rightFocused = false;
  }
}
</script>

<style scoped>
.navigation-drawer-left
  .v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close),
.navigation-drawer-left
  .v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
  box-shadow: none;
}
</style>
