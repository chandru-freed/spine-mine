import FBtnMDP, { BtnColor, BtnType } from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/FFormMDP";
import FMiniFormMDP from "@/components/generic/FMiniFormMDP";
import FSelectFieldMDP from "@/components/generic/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/FTextFieldMDP";
import AddressFMiniFormMDP from "./AddressFMiniFormMDP";

export default class CCIFProfileStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "clientInfoForm",
      dataSelectorKey: "clientInfo",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "firstName",
        label: "First Name",
        mandatory: true,
        boundaryClass: "col-4",
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "lastName",
          label: "Last Name",
          mandatory: true,
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "gender",
          label: "Gender",
          boundaryClass: "col-4",
          mandatory: true,
          items: ["Female", "Male", "Others"],
        })
      )
      .addField(
        new FEmailFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "email",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "mobile",
          label: "Mobile",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "secondaryPhone",
          label: "Secondary Phone",
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "mothersMaidenName",
          label: "Mother's Maiden Name",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "fathersName",
          label: "Father's Name",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "pan",
          label: "PAN",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "dob",
          label: "Date Of Birth",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new AddressFMiniFormMDP({ taskRoot: this.taskRoot, parent: this })
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
