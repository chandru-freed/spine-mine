import FStepperMDP from "@/components/generic/FStepperMDP";
import EnrollmentCompletionFFormMDP from "./EnrollmentCompletionFFormMDP";

export default class EnrollmentCompletionStepperMDP extends FStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: "enrollmentCompletionStepperRef" });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this
    .addStep({
      name: "Confirmation",
      stepContent: new EnrollmentCompletionFFormMDP({
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
