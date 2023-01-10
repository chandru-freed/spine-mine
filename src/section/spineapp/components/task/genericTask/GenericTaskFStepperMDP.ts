import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import GenericTaskFFormMDP from "./GenericTaskFFormMDP";

export default class GenericTaskFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "genericTaskFStepperRef",
      linearProgress: !taskRoot.taskDisabled,
      actionable: !taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Profile",
      stepContent: new GenericTaskFFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
      }),
    });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
