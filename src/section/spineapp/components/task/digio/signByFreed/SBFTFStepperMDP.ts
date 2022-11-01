import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import SBFTDisplayStepFFormMDP from "./SBFTDisplayStepFFormMDP";

export default class GSSADTFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: " signByFreedStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    const sBFTDisplayStepFFormMDP = new SBFTDisplayStepFFormMDP({
      taskRoot: taskRoot,
      parent: this,
    })
    this.addStep({
      name: "Document",
      stepContent: sBFTDisplayStepFFormMDP,
      rescueFunc: sBFTDisplayStepFFormMDP.validateAndSubmit()
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
