import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import FUCTFFormMDP from "./step1/FUCTFFormMDP";
import FUCTFinalFFormMDP from "./step2/FUCTFinalFFormMDP";

export default class FollowUpCallFStepperMDP extends FTaskStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({
      myRefName: "followUpCallFStepperRef",
      actionable: !taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    const fUCTFFormMDP = new FUCTFFormMDP({ taskRoot: taskRoot, parent: this });

    this.addStep({
      name: "Call",
      stepContent: fUCTFFormMDP,
      submitFunc: fUCTFFormMDP.validateAndSubmit(),
    }).addStep({
      name: "Mark Complete",
      stepContent: new FUCTFinalFFormMDP({ taskRoot: taskRoot, parent: this }),
    });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
