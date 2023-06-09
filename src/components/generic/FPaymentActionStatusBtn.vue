<template>

  <v-btn v-bind="$props" @click="buttonClicked()" :loading="buttonLoading">{{
    paymentLabel
  }}</v-btn>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VBtn } from "vuetify/lib/components";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";
@Component({
  components: {
    VBtn,
  },
})
export default class FPaymentActionStatusBtn extends VBtn {
  @Prop()
  paymentId: string;
  
  @Prop()
  paymentStatus: Data.ClientFile.PAYMENT_STATUS;

  @Prop()
  onClick: () => void;

  buttonLoading: boolean = false;

  buttonClicked() {
    this.buttonLoading = true;
    this.onClick();
    setTimeout(() => {
      this.buttonLoading = false;
    }, 500);
    this.handlePaymentCheckAndStatus()
  }

  handlePaymentCheckAndStatus() {

    switch(this.paymentStatus.id) {
        case Data.ClientFile.PAYMENT_STATUS.PRESENTED.id :
            this.checkPaymentStatus();
            break;
        case Data.ClientFile.PAYMENT_STATUS.DRAFT.id :
            this.presentPayment();
            break;
        case Data.ClientFile.PAYMENT_STATUS.RECEIVED.id:
              this.requestFundSplit();
              break;
        case Data.ClientFile.PAYMENT_STATUS.FUND_SPLIT_REQUESTED.id:
              this.updateFundSplitStatus();
              break;
    }
  }



  presentPayment() {
    Action.ClientFile.PresentPayment.execute1(this.paymentId, (output) => {
    });
  }

  checkPaymentStatus() {
    Action.ClientFile.CheckPaymentStatus.execute1(this.paymentId, (output) => {
      FSnackbar.success("Check payment status is clicked");
    });
  }

  updateFundSplitStatus() {
    Action.ClientFile.UpdateFundSplitStatus.execute1(
      this.paymentId,
      (output) => {
        FSnackbar.success("Check fund split status is clicked");
      }
    );
  }

  requestFundSplit() {
    Action.ClientFile.RequestFundSplit.execute1(this.paymentId, (output) => {
      FSnackbar.success("Requested the fund split");
    });
  }


  get paymentLabel(): string {
    switch(this.paymentStatus.id) {
        case Data.ClientFile.PAYMENT_STATUS.PRESENTED.id :
            return "Check Payment Status";
        case Data.ClientFile.PAYMENT_STATUS.DRAFT.id :
            return  "Present Payment";
        case Data.ClientFile.PAYMENT_STATUS.RECEIVED.id:
              return "Request Split";
        case Data.ClientFile.PAYMENT_STATUS.FUND_SPLIT_REQUESTED.id:
              return "Check Split Status";
        default: return "Check Payment"
    }
  }

  
}
</script>
