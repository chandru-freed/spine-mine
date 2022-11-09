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
            label="Select Draft Payment Type"
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

@Component({
  components: {
    CFSettlementFFormMDP,
    FForm,
  },
})
export default class CFDraftPayment extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiEMandateList
  fiEMandateList: Data.ClientFile.FiEMandateList;

  // @Store.Getter.ClientFile.ClientFileSummary.fiActiveEMandateList
  // fiActiveEMandateList: Data.ClientFile.FiActiveEMandateList;

  draftPaymentInputFormLocal: any = new Data.ClientFile.DraftPaymentInput();
  eMandateIdObj: any = {};

  get draftPaymentInputForm() {
    if (this.draftPaymentInputFormLocal.eMandateId) {
      this.eMandateIdObj = this.draftPaymentInputFormLocal.eMandateId;
      this.draftPaymentInputFormLocal.accountNumber =
        this.eMandateIdObj.accountNumber;
      this.draftPaymentInputFormLocal.accountHolderName =
        this.eMandateIdObj.accountHolderName;
      this.draftPaymentInputFormLocal.accountType =
        this.eMandateIdObj.accountType;
      this.draftPaymentInputFormLocal.ifscCode = this.eMandateIdObj.ifscCode;
    }
    if (!!this.paymentType) {
      this.draftPaymentInputFormLocal.paymentType = this.paymentType;
    }
    if (this.paymentType.title === "COLLECTION (SPA + Fee)") {
      this.draftPaymentInputFormLocal.paymentProvider =
        Data.ClientFile.PAYMENT_PROVIDER.NUPAY;
      this.draftPaymentInputFormLocal.paymentMode =
        Data.ClientFile.PAYMENT_MODE.ENACH;
    }

    if (this.paymentType.title === "COLLECTION (Only Fee)") {
      this.draftPaymentInputFormLocal.paymentProvider =
        Data.ClientFile.PAYMENT_PROVIDER.CASHFREE;
    }
    this.draftPaymentInputFormLocal.totalAmount =
      this.draftPaymentInputFormLocal.spaAmount +
      this.draftPaymentInputFormLocal.feeAmount +
      this.draftPaymentInputFormLocal.msfAmount;
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

  getFiEMandateListData() {
    return this.fiEMandateList;
  }

  handleSelectedRequestType(value: any) {
    this.paymentType = value;
    this.selectedRequestTypeMetaData = value.contentMetaData;
    this.draftPaymentInputFormLocal = new Data.ClientFile.DraftPaymentInput();
  }

  mounted() {
    this.getEMandateList();
  }

  getEMandateList() {
    Action.ClientFile.GetEMandateList.execute1(
      this.clientFileId,
      (output) => {}
    );
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

  draftPayment() {
    this.draftPaymentInputForm.clientFileId = this.clientFileId;
    this.draftPaymentInputForm.paymentType.id = this.paymentType.key;
    this.draftPaymentInputForm.eMandateId = this.eMandateIdObj.eMandateId;
    Action.ClientFile.DraftPayment.execute(
      this.draftPaymentInputForm,
      (output) => {
        this.goto(output.paymentId);
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

  goto(paymentId: string) {
    this.$router.push({
      name: "Root.CFile.CFPayment.CFPaymentDetails.CFPaymentDetails",
      params: {
        paymentId: paymentId,
      },
    });
  }
}
</script>
