import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import FlowTaskIntf from "@/section/spineapp/util/task_intf/FlowTaskIntf";
import SATDisplayStepFFormMDP from "./SATDisplayStepFFormMDP";

export default class SATFStepperMDP extends FTaskStepperMDP {
  taskRoot: FlowTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: FlowTaskIntf }) {
    super({ myRefName: "signAmendmentStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    this.addStep({
      name: "Display",
      stepContent: new SATDisplayStepFFormMDP({
        taskRoot: taskRoot,
        parent: this,
      }),
    });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
