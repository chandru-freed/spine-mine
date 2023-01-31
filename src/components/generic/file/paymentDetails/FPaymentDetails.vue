<template>
  <div class="col-12">
    <component
      v-if="fiPaymentDetails.paymentId"
      :ref="fMsfPaymentDetailsFFormMetaData.myRefName"
      :is="fMsfPaymentDetailsFFormMetaData.componentName"
      :value="selectModel(fiPaymentDetails, undefined)"
      @input="(newValue) => updateModel(fiPaymentDetails, newValue, undefined)"
      v-bind="fMsfPaymentDetailsFFormMetaData.props"
    ></component>
    <v-card-actions class="px-10">
      <v-btn outlined disabled>{{ fiPaymentDetails.status.name }}</v-btn>
      <v-spacer />
      <v-btn
        primary
        outlined
        @click="checkPaymentStatus"
        v-if="fiPaymentDetails.status.id === 'PRESENTED'"
        >Check Payment Status</v-btn
      >
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import FBtn from "../../FBtn.vue";

import ModelVue from "../../ModelVue";
import * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FMsfPaymentDetailsFFormMDP from "./FMsfPaymentDetailsFFormMDP";
import FForm from "../../form/FForm.vue";
import FSnackbar from "@/fsnackbar";

@Component({
  components: {
    FBtn,
    FForm,
  },
})
export default class FPaymentDetails extends ModelVue {
  @Prop({})
  paymentId: string;

  fiPaymentDetails: Data.ClientFile.FiPaymentDetails =
    new Data.ClientFile.FiPaymentDetails();

  mounted() {
    this.getFiPaymentDetails();
  }

  getFiPaymentDetails() {
    Action.ClientFile.GetFiPaymentDetails.execute1(this.paymentId, (output) => {
      this.fiPaymentDetails = output;
    });
  }

  checkPaymentStatus() {
    Action.ClientFile.CheckPaymentStatus.execute1(this.paymentId, (output) => {
      FSnackbar.success("Check payment status is clicked")
      setTimeout(this.getFiPaymentDetails, 1000);
    });
  }

  isRemoteTxnRefDetailsAvailable() {
    return this.fiPaymentDetails.remoteTxnRefDetails !==undefined &&this.fiPaymentDetails.remoteTxnRefDetails !==null
  }

  get fMsfPaymentDetailsFFormMetaData() {
    return new FMsfPaymentDetailsFFormMDP({ taskRoot: this }).getMetaData();
  }
}
</script>
