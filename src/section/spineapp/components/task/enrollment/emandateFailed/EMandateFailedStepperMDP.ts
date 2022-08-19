import FStepperMDP from "@/components/generic/FStepperMDP";
import EMandateFailedFFormMDP from "./EMandateFailedFFormMDP";

export default class EMandateFailedStepperMDP extends FStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: "eMandateFailedStepperRef" });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this
    .addStep({
      name: "Verify",
      stepContent: new EMandateFailedFFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
      }),
    });
  }

  getMyRef() {
    console.log(this.parent.$refs);
    return this.taskRoot.$refs[this.myRefName];
  }
}
