import FTaskStepperMDP, {
  FTaskStepMDP,
} from "@/components/generic/FTaskStepperMDP";
import AATCreditorStepFCreditorMDP from "./step1/AATCreditorStepFCreditorMDP";
import AATPPFAPaymentPlanMDP from "./step2/AATPPFAPaymentPlanMDP";

import AATFinalStepFFormMDP from "./step3/AATFinalStepFFormMDP";

export default class PATFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "prepareAmendmentStepperRef",
      actionable: !taskRoot.taskDisabled,
      linearProgress: true,
    });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    const patppFAPaymentPlanMDP =  new AATPPFAPaymentPlanMDP({
      parent: this,
      taskRoot: this.taskRoot,
    })

    this.addStep({
      name: "Creditor",
      stepContent: new AATCreditorStepFCreditorMDP({
        parent: this,
        taskRoot: this.taskRoot,
      }),
    })
      .addStep({
        name: "Payment Plan",
        stepContent:patppFAPaymentPlanMDP,
        submitFunc: patppFAPaymentPlanMDP.validateEntries()
      })
      .addStep({
        name: "Review",
        stepContent: new AATFinalStepFFormMDP({
          parent: this,
          taskRoot: this.taskRoot,
        }),
      });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
