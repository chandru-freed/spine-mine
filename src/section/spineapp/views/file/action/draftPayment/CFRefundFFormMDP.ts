import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

/* 
paymentProvider - NUPAY default 
paymentMode  - drop down
 accountNumber
accountHolderName
accountType
ifscCode
eMandateId
totalAmount
spaAmount
feeAmount = 0 set
msfAmount = 0 set
*/

export default class CFRefundFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "cfRefundFFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;

    this.addAction(
        new FBtnMDP({
          label: "Draft Payment",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.recordSettledPayment());
    };
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
  recordSettledPayment() {
    return () => {
      this.taskRoot.recordSettledPayment();
    };
  }

  gotoClientFile() {
    return () => {
      this.taskRoot.gotoClientFile();
    };
  }
}
