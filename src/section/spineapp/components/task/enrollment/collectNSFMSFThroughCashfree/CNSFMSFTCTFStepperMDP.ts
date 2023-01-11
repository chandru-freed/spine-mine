import FTaskStepperMDP, {
  FTaskStepMDP,
} from "@/components/generic/FTaskStepperMDP";

import CNSFMSFTCDraftPaymentStepMDP from "./step1/CNSFMSFTCDraftPaymentStepMDP";
import CNSFMSFTCTFinalStepFFormMDP from "./step2/CNSFMSFTCTFinalStepFFormMDP";

export default class CNSFMSFTCTFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "collectNSFMSFThroughCashfreeStepperRef",
      actionable: !taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Draft Payment",
      stepContent: new CNSFMSFTCDraftPaymentStepMDP({
        parent: this,
        taskRoot: this.taskRoot,
      }),
    }).addStep({
      name: "Mark Complete",
      stepContent: new CNSFMSFTCTFinalStepFFormMDP({
        parent: this,
        taskRoot: this.taskRoot,
      }),
    });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
