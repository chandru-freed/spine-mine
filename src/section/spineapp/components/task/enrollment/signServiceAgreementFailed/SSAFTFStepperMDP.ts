import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

import SSAFTRetryStepFFormMDP from "./SSAFTRetryStepFFormMDP";

export default class SSAFTFStepperMDP extends FTaskStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({
      myRefName: "signServiceAgreementFailedStepperRef",
      actionable: !taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Retry Sign Agreement",
      stepContent: new SSAFTRetryStepFFormMDP({
        taskRoot: taskRoot,
        parent: this,
      }),
    });
  }

  getMyRef() {
    console.log(this.parent.$refs);
    return this.taskRoot.$refs[this.myRefName];
  }
}
