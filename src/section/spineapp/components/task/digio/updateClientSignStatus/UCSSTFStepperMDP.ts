import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import UCSSTDisplayStepFFormMDP from "./UCSSTDisplayStepFFormMDP";

export default class GSSADTFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: "updateClientSignStatusStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    const uCSSTDisplayStepFFormMDP = new UCSSTDisplayStepFFormMDP({
      taskRoot: taskRoot,
      parent: this,
    })

    this.addStep({
      name: "Document",
      stepContent: uCSSTDisplayStepFFormMDP,
      rescueFunc: uCSSTDisplayStepFFormMDP.validateAndSubmit()
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
