import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import SSAFTRetryFFormMDP from "./SSAFTRetryFFormMDP";

export default class SSAFTFStepperMDP extends FTaskStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({
      myRefName: "signServieAggrementFailedStepperRef",
      actionable: false,
    });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Retry Sign Agreement",
      stepContent: new SSAFTRetryFFormMDP({ taskRoot: taskRoot, parent: this }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
