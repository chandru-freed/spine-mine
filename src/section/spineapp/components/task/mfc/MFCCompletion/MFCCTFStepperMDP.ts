import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";

import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import MFCCTStepFFormMDP from "./MFCCTStepFFormMDP";

export default class MFCCTFStepperMDP extends FTaskStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({ myRefName: "mfcCompletionStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    this.addStep({
      name: "MFC Completion",
      stepContent: new MFCCTStepFFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
      }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
