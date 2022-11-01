import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import GSSADTDisplayStepFFormMDP from "./GSSADTDisplayStepFFormMDP";

export default class GSSADTFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: " generateSSADocStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    const gSSADTDisplayStepFFormMDP = new GSSADTDisplayStepFFormMDP({
      taskRoot: taskRoot,
      parent: this,
    })

    this.addStep({
      name: "Document",
      stepContent: gSSADTDisplayStepFFormMDP,
      rescueFunc: gSSADTDisplayStepFFormMDP.validateAndSubmit()
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
