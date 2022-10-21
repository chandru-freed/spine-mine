
import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";

import DUSDTStepFFormMDP from "./DUSDTStepFFormMDP";

export default class DUSDTFStepperMDP extends FTaskStepperMDP {
  taskRoot: SelfTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: SelfTaskIntf }) {
    super({ myRefName: "downloadUnSignedDocStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    this.addStep({
      name: "Download UnSigned Doc",
      stepContent: new DUSDTStepFFormMDP({ taskRoot: taskRoot, parent: this }),
    });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
