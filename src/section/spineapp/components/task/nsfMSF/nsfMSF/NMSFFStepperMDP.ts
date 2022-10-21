import FStepperMDP from "@/components/generic/FStepperMDP";
import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import NMSFTFFormMDP from "./step1/NMSFTFFormMDP";
import NMSFTFinalFFormMDP from "./step2/NMSFTFinalFFormMDP";

export default class NMSFFStepperMDP extends FTaskStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({
      myRefName: "nsfMSFStepperRef",
      actionable: !taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    const nMSFTFFormMDP = new NMSFTFFormMDP({
      taskRoot: taskRoot,
      parent: this,
    });
    this.addStep({
      name: "Call",
      stepContent: nMSFTFFormMDP,
      submitFunc: nMSFTFFormMDP.validateAndSubmit(),
    }).addStep({
      name: "Mark Complete",
      stepContent: new NMSFTFinalFFormMDP({ taskRoot: taskRoot, parent: this }),
    });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
