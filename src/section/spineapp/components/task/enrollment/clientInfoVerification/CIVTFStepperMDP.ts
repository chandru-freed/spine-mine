import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import MDP from "@/components/generic/MDP";

import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import CIVTFFormMDP from "./CIVTFFormMDP";

export default class CIVTFStepperMDP extends FTaskStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({
      myRefName: " clientInfoVerificationStepperRef",
      actionable: !taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Verify",
      stepContent: new CIVTFFormMDP({ taskRoot: taskRoot, parent: this }),
    });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
