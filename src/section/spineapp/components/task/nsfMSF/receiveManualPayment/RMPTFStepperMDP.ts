import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";

import FlowTaskIntf from "@/section/spineapp/util/task_intf/FlowTaskIntf";
import RMPTStepFFormMDP from "./RMPTStepFFormMDP";

export default class RMPTFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: "receiveManualPaymentStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Receive Manual Payment",
      stepContent: new RMPTStepFFormMDP({ taskRoot: taskRoot, parent: this }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
