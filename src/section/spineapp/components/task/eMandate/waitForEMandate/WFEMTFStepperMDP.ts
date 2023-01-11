import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";

import DeferredTaskIntf from "@/section/spineapp/util/task_intf/DeferredTaskIntf";
import WFEMTStepFFormMDP from "./WFEMTStepFFormMDP";

export default class WFEMTFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: "waitForEMandateStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    const wFEMTStepFFormMDP = new WFEMTStepFFormMDP({ taskRoot: taskRoot, parent: this })
    this.addStep({
      name: "Wait For Emandate",
      stepContent: wFEMTStepFFormMDP,
      rescueFunc: wFEMTStepFFormMDP.validateAndSubmit()
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
