
import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";

import DUSDTStepFFormMDP from "./DUSDTStepFFormMDP";

export default class DUSDTFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: "downloadUnSignedDocStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    const dUSDTStepFFormMDP = new DUSDTStepFFormMDP({ taskRoot: taskRoot, parent: this })
    this.addStep({
      name: "Download UnSigned Doc",
      stepContent: dUSDTStepFFormMDP,
      rescueFunc: dUSDTStepFFormMDP.validateAndSubmit()
    });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
