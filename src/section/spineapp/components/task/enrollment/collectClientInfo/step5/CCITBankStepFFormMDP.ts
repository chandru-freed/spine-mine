import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import AddressFMiniFormMDP from "@/components/generic/form/field/AddressFMiniFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import { CollectClientInfoTaskIntf } from "../CollectClientInfoTaskIntf";

export default class CCITBankStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: CollectClientInfoTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: CollectClientInfoTaskIntf; parent: any }) {
    super({
      myRefName: "bankInfoForm",
      dataSelectorKey: "taskOutput.bankInfo",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "accountNumber",
        label: "Account Number",
        mandatory: true,
        boundaryClass: "col-3",
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "ifscCode",
          label: "IFSC Code",
          mandatory: true,
          boundaryClass: "col-3",
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountType",
          label: "Account Type",
          boundaryClass: "col-3",
          mandatory: true,
          items: ["SAVINGS", "CURRENT"],
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountHolderName",
          label: "Account Holder Name",
          mandatory: true,
          boundaryClass: "col-3",
        })
      )
      .addField(
        new AddressFMiniFormMDP({ 
          taskRoot: this.taskRoot,
          parent: this,
          dataSelectorKey: "bankAddress",
          disabled: taskRoot.taskDisabled,
          label: "Bank Address",
          mandatory: true,
         })
      )

      .addAction(
        new FBtnMDP({
          label: "Save",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.saveTask());
    };
  }

  saveTask() {
    return () => {
      this.taskRoot.saveTask();
    };
  }
}
