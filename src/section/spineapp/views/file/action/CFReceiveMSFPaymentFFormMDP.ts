import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";

export default class CFReceiveMSFPaymentFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "cfReceiveMSFPaymentFFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;

    this.addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "msfAmount",
        label: "MSF Amount",
        boundaryClass: "col-12",
        mandatory: true,
      })
    )
      .addAction(
        new FBtnMDP({
          label: "Cancel",
          onClick: this.gotoClientFile(),
          btnType: BtnType.TEXT,
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Receive MSF Payment",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.receiveMSFPayment());
    };
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
  receiveMSFPayment() {
    return () => {
      this.taskRoot.receiveMSFPayment();
    };
  }

  gotoClientFile() {
    return () => {
      this.taskRoot.goBack();
    };
  }
}
