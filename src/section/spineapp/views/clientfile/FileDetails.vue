<template>
  <div v-if="showLeftPanel"  :class="showBothPanel ? 'col-6' : 'col-12'"  >
    <v-card outlined>
    <template>
      <v-toolbar flat dense color="grey lighten-2">
        <v-tabs
          :value="selectedTab"
          @change="changeSelectedTab" 
          background-color="grey lighten-2"
          color="secondary"
          grow
          show-arrows
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

    <v-tabs-items :value="selectedTab" flat>
      <v-tab-item v-for="item in fileDetailsTabList" :key="item.tabName">
        <v-card flat min-height="600">
          <component :is="item.component"></component>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </v-card>
    
   
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
import PaymentTransaction from "../../components/file/payment/PaymentTransaction.vue";

@Component({
  components: {
    "file-info": FileInfo,
    "file-profile": FileProfile,
    "file-bank": FileBank,
    "file-budget": FileBudget,
    "file-creditor-list": FileCreditorList,
    "file-payment-plan": FilePaymentPlan,
    "file-document-list": FileDocumentList,
    "payment": Payment,
    "ptayment-transaction": PaymentTransaction,
  },
})
export default class FileDetails extends Vue {
  clientfileNumber = this.$route.params.clientFileNumber;
  fileDetailsTabList = [
    // {
    //   tabName: "Info",
    //   component: "file-info",
    // },
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
    {
      tabName: "transaction",
      component: "ptayment-transaction",
    },
  ];

  changeSelectedTab(value: number) {
    this.$router.push({
      query: {
        ...this.$route.query,
        lt: value.toString(),
      },
    });
  }

  get selectedTab() {
    return this.$route.query.lt ? Number(this.$route.query.lt) : 0;
  }


  panelQSr = this.$route.query.panel || ""
  panelQList = this.panelQSr.split(",")
  get showLeftPanel() {
    if(!this.panelQList.includes("rp") &&  !this.panelQList.includes("lp")){ 
      return true
    }
     return this.panelQList.includes("lp")
  }

  get showBothPanel() {
    if(!this.panelQList.includes("rp") &&  !this.panelQList.includes("lp")) {
      return true
    }

    if(this.panelQList.includes("rp") &&  this.panelQList.includes("lp")) {
      return true
    }

    return false
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
