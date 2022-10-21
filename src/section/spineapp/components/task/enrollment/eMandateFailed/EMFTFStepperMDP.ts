import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";

import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

import EMFTRetryStepFFormMDP from "./EMFTRetryStepFFormMDP";

export default class EMFTFStepperMDP extends FTaskStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({
      myRefName: " eMandateFailedStepperRef",
      actionable: !taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Retry Emandate",
      stepContent: new EMFTRetryStepFFormMDP({
        taskRoot: taskRoot,
        parent: this,
      }),
    });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
