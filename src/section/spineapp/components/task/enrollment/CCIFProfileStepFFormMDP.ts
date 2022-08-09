import FBtnMDP, { BtnColor, BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/FFormMDP";
import FTextFieldMDP from "@/components/generic/FTextFieldMDP";

export default class CCIFProfileStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({ myRefName: "testFForm" });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelector: "firstName",
        label: "First Name",
        mandatory: true,
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelector: "lastName",
          label: "Last Name",
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Cancel",
          onClick: this.cancel(),
          btnType: BtnType.TEXT,
        })
      ).addAction(
        new FBtnMDP({
          label: "Submit",
          onClick: this.validateAndSubmit(),
        })
      )
      ;
  }

  test() {
    console.log("Test is being called");
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.test);
    };
  }

  cancel() {
    return () => {
      console.log("I am being CANCELLED");
    };
  }
}
