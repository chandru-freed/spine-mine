import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";

import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import UCSDTDisplayStepFFormMDP from "./UCSDTDisplayStepFFormMDP";

export default class GSSADTFStepperMDP extends FTaskStepperMDP {
  taskRoot: SelfTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: SelfTaskIntf }) {
    super({ myRefName: " uploadClientSignedDocStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Document",
      stepContent: new UCSDTDisplayStepFFormMDP({
        taskRoot: taskRoot,
        parent: this,
      }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
