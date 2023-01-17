<template>
  <div class="CFDraftPayment">
    <!-- {{selectedRequestType}} -->
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Draft Payment</h4>
      <v-btn @click="gotoAction" text icon color="lighten-2" class="ma-2">
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </div>
    <div class="d-flex justify-center col-12 ma-auto">
      <v-card
        class="pa-0 ma-0 mt-5 col-12"
        color="white"
        outlined
        min-height="300px"
      >
        <v-card-text>
          <v-autocomplete
            :value="selectedRequestTypeMetaData"
            @input="handleSelectedRequestType"
            :items="requestTypeFlowMapList"
            flat
            hide-no-data
            hide-details
            label="Payment Type"
            outlined
            dense
            return-object
            item-text="title"
            item-value="contentMetaData"
          ></v-autocomplete>
        </v-card-text>

        <v-card-text>
          
          <component
            v-if="!!selectedRequestTypeMetaData"
            :ref="selectedRequestTypeMetaData.myRefName"
            :is="selectedRequestTypeMetaData.componentName"
            v-model="draftPaymentInputForm"
            v-bind="selectedRequestTypeMetaData.props"
          ></component>
        </v-card-text>
      </v-card>
    </div>
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
import CFCollectionFFormMDP from "./draftPayment/CFCollectionFFormMDP";
import CFRefundFFormMDP from "./draftPayment/CFRefundFFormMDP";
import CFCollectionSPAFFormMDP from "./draftPayment/CFCollectionSPAFFormMDP";
import CFCollectionFeeFFormMDP from "./draftPayment/CFCollectionFeeFFormMDP";
import CFSettlementToClientFFormMDP from './draftPayment/CFSettlementToClientFFormMDP';
import CFSettlementToCreditorFFormMDP from './draftPayment/CFSettlementToCreditorFFormMDP';
@Component({
  components: {
    CFSettlementFFormMDP,
    FForm,
  },
})
export default class CFDraftPayment extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorInfo: Data.ClientFile.FiCreditorInfo;

  // @Store.Getter.ClientFile.ClientFileSummary.fiActiveEMandateList
  // fiActiveEMandateList: Data.ClientFile.FiActiveEMandateList;

  draftPaymentInputFormLocal: Data.ClientFile.DraftPaymentInput = new Data.ClientFile.DraftPaymentInput();
  // eMandateSelected: Data.ClientFile.FiEMandateList = new Data.ClientFile.FiEMandateList();

  get draftPaymentInputForm()  {
    this.draftPaymentInputFormLocal.clientFileId = this.clientFileId;
    this.draftPaymentInputFormLocal.paymentType.id = this.paymentType.key;
    if (this.draftPaymentInputFormLocal.eMandate) {
      //this.eMandateSelected = this.draftPaymentInputFormLocal.eMandate;
      this.draftPaymentInputFormLocal.eMandateId = this.draftPaymentInputFormLocal.eMandate.eMandateId;
      if(this.paymentType.code !== 'settlement-to-creditor') {
      this.draftPaymentInputFormLocal.accountNumber =
        this.draftPaymentInputFormLocal.eMandate.accountNumber;
      this.draftPaymentInputFormLocal.accountHolderName =
        this.draftPaymentInputFormLocal.eMandate.accountHolderName;
      this.draftPaymentInputFormLocal.accountType =
        this.draftPaymentInputFormLocal.eMandate.accountType;
      this.draftPaymentInputFormLocal.ifscCode = this.draftPaymentInputFormLocal.eMandate.ifscCode;
      }
    }
    if (!!this.paymentType) {
      this.draftPaymentInputFormLocal.paymentType = this.paymentType;
    }
    if (this.paymentType.code === "depositSpaAndFee") {
      this.draftPaymentInputFormLocal.paymentProvider =
        Data.ClientFile.PAYMENT_PROVIDER.NUPAY;
      this.draftPaymentInputFormLocal.paymentMode =
        Data.ClientFile.PAYMENT_MODE.ENACH;
    }

    if (this.paymentType.code === "depositOnlyFee") {
      this.draftPaymentInputFormLocal.paymentProvider =
        Data.ClientFile.PAYMENT_PROVIDER.CASHFREE;
    }
    if(this.paymentType.code==='settlement-to-client') {
      this.draftPaymentInputFormLocal.settledTo = Data.ClientFile.SETTLED_TO.CL_PERSONAL;
      this.draftPaymentInputFormLocal.settledToId = this.clientFileId;
    }
    if(this.paymentType.code==='settlement-to-creditor') {
      this.draftPaymentInputFormLocal.settledTo = Data.ClientFile.SETTLED_TO.CREDITOR;
    }
    
    this.draftPaymentInputFormLocal.totalAmount =
      (this.draftPaymentInputFormLocal.spaAmount||0) +
      (this.draftPaymentInputFormLocal.feeAmount || 0) +
      (this.draftPaymentInputFormLocal.msfAmount || 0);
    return this.draftPaymentInputFormLocal;
  }

  set draftPaymentInputForm(value: any) {
    this.draftPaymentInputFormLocal = value;
  }

  paymentProviderType() {
    const paymentProvider =
      this.draftPaymentInputFormLocal.paymentProvider.id !== "CASHFREE";
    return paymentProvider;
  }

  selectedRequestTypeMetaData: any = {};

  clientFileId = this.$route.params.clientFileId;
  paymentType: any = {};


  handleSelectedRequestType(value: any) {
    this.paymentType = value;
    this.selectedRequestTypeMetaData = value.contentMetaData;
    this.draftPaymentInputFormLocal = new Data.ClientFile.DraftPaymentInput();
  }

  mounted() {
    this.getFiCreditorInfo();
  }

   getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }


  get requestTypeFlowMapList() {
    return [
      // {
      //   key: "SETTLEMENT",
      //   title: "SETTLEMENT",
      //   contentMetaData: new CFSettlementFFormMDP({
      //     taskRoot: this,
      //   }).getMetaData(),
      //   code: "settlement",
      // },

      {
        key: "SETTLEMENT",
        title: "SETTLEMENT TO CLIENT",
        contentMetaData: new CFSettlementToClientFFormMDP({
          taskRoot: this,
        }).getMetaData(),
        code: "settlement-to-client",
      },
      {
        key: "SETTLEMENT",
        title: "SETTLEMENT TO CREDITOR",
        contentMetaData: new CFSettlementToCreditorFFormMDP({
          taskRoot: this,
        }).getMetaData(),
        code: "settlement-to-creditor",
      },
      {
        key: "COLLECTION",
        title: "DEPOSIT (SPA + Fee)",
        contentMetaData: new CFCollectionSPAFFormMDP({
          taskRoot: this,
        }).getMetaData(),
        code: "depositSpaAndFee",
      },
      {
        key: "COLLECTION",
        title: "DEPOSIT (Only Fee)",
        contentMetaData: new CFCollectionFeeFFormMDP({
          taskRoot: this,
        }).getMetaData(),
        code: "depositOnlyFee",
      },
      {
        key: "REFUND",
        title: "REFUND",
        contentMetaData: new CFRefundFFormMDP({
          taskRoot: this,
        }).getMetaData(),
        code: "refund",
      },
    ];
  }

  draftPayment() {
    Action.ClientFile.DraftPayment.execute(
      this.draftPaymentInputForm,
      (output) => {
        this.gotoCFPaymentDetails(output.paymentId);
      }
    );
  }

  gotoAction(paymentId: string) {
    this.$router.push({
      name: "Root.CFile.CFAction.CFActionList",
      params: {
        clientFileId: this.clientFileId,
      },
    });
  }

  gotoCFPaymentDetails(paymentId: string) {
    this.$router.push({
      name: "Root.CFile.CFPayment.CFPaymentDetails.CFPaymentDetails",
      params: {
        paymentId: paymentId,
      },
    });
  }
}
</script>
