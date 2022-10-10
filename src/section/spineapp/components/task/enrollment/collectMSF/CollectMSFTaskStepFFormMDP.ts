import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class CollectMSFTaskStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "receiveMSFPaymentFFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.paymentPlan.ppCalculator.msfDraftAmount",
        label: "MSF Amount",
        boundaryClass: "col-12",
        mandatory: true,
        disabled: true
      })
    )
    // .addAction(
    //   new FBtnMDP({
    //     label: "Receive MSF Payment",
    //     onClick: this.receiveMSFPayment(),
    //   })
    // ).addAction(
    //   new FBtnMDP({
    //     label: "Check Payment Statust",
    //     onClick: this.checkPaymentStatus(),
    //   })
    // );
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  receiveMSFPayment() {
    return () => {
      this.taskRoot.receiveMSFPayment();
    };
  }

  checkPaymentStatus() {
    return () => {
      this.taskRoot.checkPaymentStatus();
    }
  }

}
