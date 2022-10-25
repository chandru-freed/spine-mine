import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";

import DeferredTaskIntf from "@/section/spineapp/util/task_intf/DeferredTaskIntf";

import WFCSTStepFFormMDP from "./WFCSTStepFFormMDP";

export default class WFCSTFStepperMDP extends FTaskStepperMDP {
  taskRoot: DeferredTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: DeferredTaskIntf }) {
    super({ myRefName: "waitForClientSignStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    this.addStep({
      name: "Wait For Client Sign",
      stepContent: new WFCSTStepFFormMDP({ taskRoot: taskRoot, parent: this }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
