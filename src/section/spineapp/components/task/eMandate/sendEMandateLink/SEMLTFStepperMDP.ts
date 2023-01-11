import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import SEMLTStepFFormMDP from "./SEMLTStepFFormMDP";

export default class SEMLTFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: "sendEMandateLinkStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    const sEMLTStepFFormMDP = new SEMLTStepFFormMDP({ taskRoot: taskRoot, parent: this })
    this.addStep({
      name: "Send EMandate Link",
      stepContent: sEMLTStepFFormMDP,
      rescueFunc: sEMLTStepFFormMDP.validateAndSubmit()
    });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
