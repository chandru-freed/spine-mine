<template>
  <div class="CFDraftPayment">
    <!-- fiPaymentDetails : {{ fiPaymentDetails }} -->
    <div class="d-flex justify-center col-12 ma-auto" v-if="!!fiPaymentDetails.paymentId">
      <v-card
        class="pa-0 ma-0 mt-5 col-12"
        color="white"
        outlined
        min-height="300px"
      >
        <v-card-text>
          <v-autocomplete
            disabled
            :value="selectedRequestType"
            :items="requestTypeFlowMapList"
            flat
            hide-no-data
            hide-details
            label="Select Draft Payment Type"
            outlined
            dense
            item-value="contentMetaData"
            item-text="key"
          ></v-autocomplete>
        </v-card-text>

        <v-card-text>
          <component
            v-if="!!selectedRequestType"
            :ref="selectedRequestType.myRefName"
            :is="selectedRequestType.componentName"
            disabled
            :value="fiPaymentDetails"
            v-bind="selectedRequestType.props"
          ></component>
        </v-card-text>
        <v-card-actions class="px-10">
          <v-btn outlined disabled >{{fiPaymentDetails.status.name}}</v-btn>
          <v-spacer></v-spacer>
          <v-btn primary outlined @click="presentPayment" v-if="fiPaymentDetails.status.id === 'DRAFT'">Present Payment</v-btn>
          <v-btn primary outlined @click="checkPaymentStatus" v-if="fiPaymentDetails.status.id === 'PRESENTED'">Check Payment Status</v-btn>
          <v-btn primary outlined @click="requestFundSplit"  v-if="fiPaymentDetails.status.id === 'RECEIVED' && fiPaymentDetails.paymentMode.id === 'ENACH'">Request Split</v-btn>
          <v-btn primary outlined @click="updateFundSplitStatus"  v-if="fiPaymentDetails.status.id === 'FUND_SPLIT_REQUESTED'">Check Split Status</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-col class="col-12">
      <v-card flat outlined>
        <v-card-title class="pb-0">Transactions</v-card-title>
        <v-card-text class="pa-0">
          <v-data-table
            :headers="headers"
            :items="paymentTransactionList"
            sort-by="draftDate"
            class="elevation-0"
          >
            <template v-slot:[`item.txnDate`]="{ item }">
              <span class="grey--text">
                {{ item.txnDate | date }}
              </span>
            </template>
            <template v-slot:[`item.amount`]="{ item }">
              {{ item.debit ? "- " : "+ " }}{{ item.amount | toINR }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </div>
  <!--  TASK TAB -->
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

import FForm from "@/components/generic/form/FForm.vue";
import Helper from "../../../util/Helper";
import CFSettlementFFormMDP from "./draftPayment/CFSettlementFFormMDP";
import CFRefundFFormMDP from "./draftPayment/CFRefundFFormMDP";
import CFCollectionSPAFFormMDP from "./draftPayment/CFCollectionSPAFFormMDP";
import CFCollectionFeeFFormMDP from "./draftPayment/CFCollectionFeeFFormMDP";

@Component({
  components: {
    CFSettlementFFormMDP,
    FForm,
  },
})
export default class CFPaymentDetails extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;


  fiPaymentDetails: any = new Data.ClientFile.FiPaymentDetails();

  // selectedRequestType: any = {};

  clientFileId = this.$route.params.clientFileId;
  paymentId = this.$route.params.paymentId;

  paymentTransactionList: Data.ClientFile.PaymentTransaction[] = []

  get selectedRequestType() {
    if(this.fiPaymentDetails.paymentType.id === "SETTLEMENT" ) {
      return this.requestTypeFlowMapList.find(x => x.key === "SETTLEMENT" )?.contentMetaData;
    }

    if(this.fiPaymentDetails.paymentType.id === "REFUND" ) {
      return this.requestTypeFlowMapList.find(x => x.key === "REFUND" )?.contentMetaData;
    }

    if(this.fiPaymentDetails.paymentType.id === "COLLECTION" ) {
      if(this.fiPaymentDetails.spaAmount > 0) {
        return this.requestTypeFlowMapList.find(x => x.title === "COLLECTION (SPA + Fee)" )?.contentMetaData;
      }
      return this.requestTypeFlowMapList.find(x => x.title === "COLLECTION (Only Fee)" )?.contentMetaData;
      
    }
    // return this.requestTypeFlowMapList.find(x => x.key === this.fiPaymentDetails.paymentType.id)?.contentMetaData;
  }

  mounted() {
    this.loadPaymentDetails()
  }

  loadPaymentDetails() {
    this.getFiPaymentDetails();
    this.getPaymentTransactionList();
  }


  get requestTypeFlowMapList() {
    return [
      {
        key: "SETTLEMENT",
        title: "SETTLEMENT",
        contentMetaData: new CFSettlementFFormMDP({
          taskRoot: this,
        }).getMetaData(),
      },
      {
        key: "COLLECTION",
        title: "COLLECTION (SPA + Fee)",
        contentMetaData: new CFCollectionSPAFFormMDP({
          taskRoot: this,
        }).getMetaData(),
      },
      {
        key: "COLLECTION",
        title: "COLLECTION (Only Fee)",
        contentMetaData: new CFCollectionFeeFFormMDP({
          taskRoot: this,
        }).getMetaData(),
      },
      {
        key: "REFUND",
        title: "REFUND",
        contentMetaData: new CFRefundFFormMDP({
          taskRoot: this,
        }).getMetaData(),
      },
    ];
  }

  getFiPaymentDetails() {
    Action.ClientFile.GetFiPaymentDetails.execute1(this.paymentId, (output) => {
      this.fiPaymentDetails = output;
    });
  }

  presentPayment() {
    Action.ClientFile.PresentPayment.execute1(this.paymentId, (output) => {
      setTimeout(this.loadPaymentDetails, 1000)
    });
  }

  checkPaymentStatus() {
    Action.ClientFile.CheckPaymentStatus.execute1(this.paymentId, (output) => {
      setTimeout(this.loadPaymentDetails, 1000)
    });
  }

  updateFundSplitStatus() {
    Action.ClientFile.UpdateFundSplitStatus.execute2(this.paymentId, "", (output) => {
      setTimeout(this.loadPaymentDetails, 1000)
    });
  }

  requestFundSplit() {
    Action.ClientFile.RequestFundSplit.execute1(this.paymentId, (output) => {
      setTimeout(this.loadPaymentDetails, 1000)
    });
  }

  gotoAction(paymentId: string) {
    this.$router.push({
      name: "Root.CFile.CFAction.CFActionList",
      params: {
        clientFileId: this.clientFileId,
      },
    });
  }

  headers = [
    { text: "Account Identifier", value: "accountIdentifier" },
    { text: "Intent", value: "intent" },
    { text: "Amount", value: "amount" },
    { text: "Payment Ref Number", value: "paymentRefNumber" },
    { text: "Remote Txn Ref Number", value: "remoteTxnRefNumber" },
    { text: "Txn Date", value: "txnDate" },
  ];


  //ACTION
  getPaymentTransactionList() {
    Action.ClientFile.GetPaymentTransactionList.execute1(
      this.paymentId,
      (output) => {
        this.paymentTransactionList = output
      }
    );
  }
}
</script>
