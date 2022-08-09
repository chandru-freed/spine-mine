import FFormMDP from "@/components/generic/FFormMDP";
import FStepperMDP from "@/components/generic/FStepperMDP";
import FTextFieldMDP from "@/components/generic/FTextFieldMDP";
import CCIFProfileStepFFormMDP from "./CCIFProfileStepFFormMDP";

export default class CCITFStepperMDP extends FStepperMDP {
  taskRoot: any;
  parent: any
  constructor({
    taskRoot,
  }: {
    taskRoot: any;
  }) {
    super({ myRefName: "collectClientInfoStepperRef" });
    this.taskRoot = taskRoot;
    this.parent = taskRoot

    this.addStep(
      "Profile",
      new CCIFProfileStepFFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
      })
    );
  }

  getMyRef() {
    return this.parent.$refs[this.myRefName]
  }
}
