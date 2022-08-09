import FBtnMDP, { BtnColor, BtnType } from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/FFormMDP";
import FSelectFieldMDP from "@/components/generic/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/FTextFieldMDP";

export default class CCIFProfileStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "testFForm",
      dataSelectorKey: "clientInfo",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "name",
        label: "Name",
        mandatory: true,
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "mobile",
          label: "Mobile",
          boundaryClass: "col-4"
        })
      )
      .addField(
        new FEmailFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "email",
          boundaryClass: "col-4",
          mandatory: true,
        })
      ).addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "gender",
          label: "Gender",
          boundaryClass: "col-4",
          items: ["Female", "Male", "Others"]
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
