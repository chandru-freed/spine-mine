import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";

import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import ECTStepFFormMDP from "./ECTStepFFormMDP";

export default class ECTFStepperMDP extends FTaskStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({
      myRefName: "enrollmentCompletionStepperRef",
      actionable: !taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Enrollment Completion",
      stepContent: new ECTStepFFormMDP({ taskRoot: taskRoot, parent: this }),
    });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
