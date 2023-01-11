import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

import CSETStepFFormMDP from "./CSETStepFFormMDP";

export default class CSETFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: "clientSignExpiredStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
const cSETStepFFormMDP =  new CSETStepFFormMDP({ taskRoot: taskRoot, parent: this })
    this.addStep({
      name: "Client Sign Expired",
      stepContent: cSETStepFFormMDP,
      rescueFunc: cSETStepFFormMDP.validateAndSubmit()
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
