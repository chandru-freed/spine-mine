import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";

export default class CFUpdateClientDetailsFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "cfUpdateClientDetailsormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "firstName",
        label: "First Name",
        boundaryClass: "col-4",
        mandatory: true,
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "middleName",
          label: "Middle Name",
          boundaryClass: "col-4",
          
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "lastName",
          label: "Last Name",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FEmailFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "newEmailId",
          label: "Email",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FPhoneFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "newMobile",
          label: "Mobile",
          boundaryClass: "col-4",
          mandatory: true,
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
      this.getMyRef().submitForm(this.updateClientDetails());
    };
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }

  updateClientDetails() {
    return () => {
      this.taskRoot.updateClientDetails();
    };
  }
}
