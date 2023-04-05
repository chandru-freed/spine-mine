import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";


export default class FPaymentDetailsMDP implements MDP {
  componentName = "FPaymentDetails";
  myRefName: string = "fPaymentDetailsRef"
  paymentId: string;
  onSuccess?: (status: string) => void

  constructor({ paymentId, onSuccess }: { paymentId: string,onSuccess?: (status: string) => void }) {
    this.paymentId = paymentId;
    this.onSuccess = onSuccess;
  }



  getMetaData(): object {
    return {
      componentName: this.componentName,
      myRefName: this.myRefName,
      props: {
        paymentId:this.paymentId,
        onSuccess: this.onSuccess
      },
    };
  }

}
