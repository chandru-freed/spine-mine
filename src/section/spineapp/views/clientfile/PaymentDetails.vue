<template>
  <v-navigation-drawer
    absolute
    permanent
    right
    :width="rightFocused ? '100%' : '49%'"
    v-if="!leftFocused"
  >
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Payment Details</h4>
      <v-btn @click="gotoClientFile" text icon color="lighten-2" class="ma-2">
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </div>
    <!-- {{ fiPaymentDetails }} -->
    <component
      v-if="fiPaymentDetails"
      :ref="paymentDetailsMetaData.myRefName"
      :is="paymentDetailsMetaData.componentName"
      :value="selectModel(fiPaymentDetails, undefined)"
      @input="(newValue) => updateModel(fiPaymentDetails, newValue, undefined)"
      v-bind="paymentDetailsMetaData.props"
    ></component>
    <div class="d-flex justify-end">
      <f-btn
        label="Check Payment Status"
        class="mx-2"
        :onClick="() => checkPaymentStatus()"
        outlined
        color="primary"
      ></f-btn>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import PaymentDetailsFFormMDP from "./PaymentDetailsFFormMDP";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import Helper from "../../util/Helper";
import FBtn from "@/components/generic/FBtn.vue";

@Component({
  components: {
    FForm,
    "f-btn": FBtn,
  },
})
export default class PaymentDetails extends ModelVue {
  paymentId = this.$route.params.paymentId;
  clientFileNumber = this.$route.params.clientFileNumber;

  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentDetails
  fiPaymentDetails: Data.ClientFile.FiPaymentDetails;

  leftFocused = false;
  rightFocused = true;

  //METADATA
  get paymentDetailsMetaData() {
    return new PaymentDetailsFFormMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  mounted() {
    this.getFiPaymentDetails();
  }

  getFiPaymentDetails() {
    Action.ClientFile.GetFiPaymentDetails.execute1(
      this.paymentId,
      (output) => {}
    );
  }

  gotoClientFile() {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: this.clientFileNumber,
    });
  }

  checkPaymentStatus() {
    Action.ClientFile.CheckPaymentStatus.execute1(this.paymentId, (output) => {
      this.getFiPaymentDetails();
    });
  }
}
</script>

<style></style>
