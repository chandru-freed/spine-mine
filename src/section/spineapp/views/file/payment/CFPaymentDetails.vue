<template>
  <div class="CFDraftPayment">
    <!-- fiPaymentDetails : {{ fiPaymentDetails }} -->
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Payment Details</h4>
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

  get selectedRequestType() {
    return this.requestTypeFlowMapList.find(x => x.key === this.fiPaymentDetails.paymentType.id)?.contentMetaData;
  }

  mounted() {
    this.getFiPaymentDetails();
  }

  get requestTypeFlowMapList() {
    return [
      {
        key: "SETTLEMENT",
        contentMetaData: new CFSettlementFFormMDP({
          taskRoot: this,
        }).getMetaData(),
      },
      {
        key: "COLLECTION",
        contentMetaData: new CFCollectionFFormMDP({
          taskRoot: this,
        }).getMetaData(),
      },
      {
        key: "REFUND",
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
      setTimeout(() => {this.getFiPaymentDetails()}, 1000)
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
}
</script>
