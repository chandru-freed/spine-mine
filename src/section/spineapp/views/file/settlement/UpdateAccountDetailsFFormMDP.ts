import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FAccountFieldMDP from "@/components/generic/form/field/FAccountFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";

export default class UpdateAccountDetailsFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "updateAccountDetailsRef",
      disabled: taskRoot.disabled,
    });
    this.taskRoot = taskRoot;

    this
      .addField(
        new FAccountFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountNumber",
          label: "Account Number",
          boundaryClass: "col-3",
          mandatory: true
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountHolderName",
          label: "Account Holder Name",
          boundaryClass: "col-3",
          mandatory: true
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountType",
          label: "Account Type",
          boundaryClass: "col-3",
          options: Data.ClientFile.ACCOUNT_TYPE.list(),
          optionLabel: "name",
          optionValue: "id",
          mandatory: true
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "ifscCode",
          label: "IFSC Code",
          boundaryClass: "col-3",
          mandatory: true,
          rules: "validate_ifsc"
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Cancel",
          btnType: BtnType.TEXT,
          onClick:this.closeUpdateForm(),
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Update Account Info",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }

  // new implement
  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.taskRoot.updateAccountInfo();
      });
    };
  }

  closeUpdateForm() {
    return () => {
      this.taskRoot.closeDialogs();
    };
  }
}
