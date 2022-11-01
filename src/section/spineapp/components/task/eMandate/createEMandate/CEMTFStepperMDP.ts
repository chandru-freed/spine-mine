import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import CEMTStepFFormMDP from "./CEMTStepFFormMDP";

export default class CEMTFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;

  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: "createEMandateStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    const cEMTStepFFormMDP = new CEMTStepFFormMDP({ taskRoot: taskRoot, parent: this })

    this.addStep({
      name: "Create EMandate",
      stepContent: cEMTStepFFormMDP,
      rescueFunc: cEMTStepFFormMDP.validateAndSubmit()
    });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
