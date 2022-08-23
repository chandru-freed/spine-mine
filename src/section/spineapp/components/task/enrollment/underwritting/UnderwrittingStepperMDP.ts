import FStepperMDP from "@/components/generic/FStepperMDP";
import CCITMarkCompleteStepFFormMDP from "../collectClientInfo/step7/CCITMarkCompleteStepFFormMDP";

export default class UnderwrittingStepperMDP extends FStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: "collectClientInfoStepperRef" });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this
    
    .addStep({
      name: "Verify",
      stepContent: new CCITMarkCompleteStepFFormMDP({
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
