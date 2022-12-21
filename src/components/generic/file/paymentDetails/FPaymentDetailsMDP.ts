import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";


export default class FPaymentDetailsMDP implements MDP {
  componentName = "FPaymentDetails";
  myRefName: string = "fPaymentDetailsRef"
    paymentId: string;

  constructor({ paymentId }: { paymentId: string }) {
    this.paymentId = paymentId;
  }



  getMetaData(): object {
    return {
      componentName: this.componentName,
      myRefName: this.myRefName,
      props: {
        paymentId:this.paymentId
      },
    };
  }

}
