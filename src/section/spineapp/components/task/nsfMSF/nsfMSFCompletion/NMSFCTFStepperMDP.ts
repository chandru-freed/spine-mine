import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";

import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import NMSFCTStepFFormMDP from "./NMSFCTStepFFormMDP";

export default class NMSFCTFStepperMDP extends FTaskStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({ myRefName: "nsfMSFCompletionStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    this.addStep({
      name: "Nsf MSF Completion",
      stepContent: new NMSFCTStepFFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
      }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
