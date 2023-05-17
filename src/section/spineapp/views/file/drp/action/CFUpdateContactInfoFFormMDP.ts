import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";

export default class CFUpdateContactInfoFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "cfUpdateContactInfoFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;

    this.addField(
      new FEmailFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "newEmailId",
        label: "Email ID",
        boundaryClass: "col-6",
        disabled: this.disabled,
      })
    )
      .addField(
        new FPhoneFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "newMobile",
          label: "Mobile Number",
          boundaryClass: "col-6",
          disabled: this.disabled,
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Update",
          onClick: this.validateAndSubmit(),
        })
      );
  }
  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.updateContactInfo());
    };
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }

  updateContactInfo() {
    return () => {
      this.taskRoot.updateContactInfo();
    };
  }
}
