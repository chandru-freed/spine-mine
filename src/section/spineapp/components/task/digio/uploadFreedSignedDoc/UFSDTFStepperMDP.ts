import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";

import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import UFSDTStepFFormMDP from "./UFSDTStepFFormMDP";

export default class UFSDTFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: "uploadFreedSignedDocStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    const uFSDTStepFFormMDP = new UFSDTStepFFormMDP({ taskRoot: taskRoot, parent: this })
    this.addStep({
      name: "Upload FREED Signed Doc",
      stepContent: uFSDTStepFFormMDP,
      rescueFunc: uFSDTStepFFormMDP.validateAndSubmit()
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
