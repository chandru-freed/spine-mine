import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";

import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import UCSDTDisplayStepFFormMDP from "./UCSDTDisplayStepFFormMDP";

export default class GSSADTFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: " uploadClientSignedDocStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    const uCSDTDisplayStepFFormMDP = new UCSDTDisplayStepFFormMDP({
      taskRoot: taskRoot,
      parent: this,
    })

    this.addStep({
      name: "Document",
      stepContent: uCSDTDisplayStepFFormMDP,
      rescueFunc: uCSDTDisplayStepFFormMDP.validateAndSubmit()
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
