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
            item-text="key"
            item-value="contentMetaData"
          ></v-autocomplete>
        </v-card-text>

        <v-card-text>
          <component
            v-if="!!selectedRequestTypeMetaData"
            :ref="selectedRequestTypeMetaData.myRefName"
            :is="selectedRequestTypeMetaData.componentName"
            v-model="draftPaymentInput"
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

  draftPaymentInput: any = new Data.ClientFile.DraftPaymentInput();

  selectedRequestTypeMetaData: any = {};

  clientFileId = this.$route.params.clientFileId;
  paymentType: string;

  handleSelectedRequestType(value: any) {
    this.paymentType = value.key;
    console.log(this.paymentType);
    this.selectedRequestTypeMetaData = value.contentMetaData;
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

  draftPayment() {
    this.draftPaymentInput.clientFileId = this.clientFileId;
    this.draftPaymentInput.paymentType.id = this.paymentType;
    Action.ClientFile.DraftPayment.execute(this.draftPaymentInput, (output) => {
      this.goto(output.paymentId);
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
