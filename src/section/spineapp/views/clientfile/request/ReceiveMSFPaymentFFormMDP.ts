import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class ReceiveMSFPaymentFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any; }) {
    super({
      myRefName: "receiveMSFPaymentFFormRef",
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
    ).addAction(
      new FBtnMDP({
        label: "Cancel",
        onClick: this.gotoClientFile(),
        btnType: BtnType.TEXT,
      })
    ).addAction(
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
      this.taskRoot.gotoClientFile();
    }
  }


}
