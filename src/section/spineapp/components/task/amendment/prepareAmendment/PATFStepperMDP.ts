import FTaskStepperMDP, {
  FTaskStepMDP,
} from "@/components/generic/FTaskStepperMDP";
import PATCreditorStepFCreditorMDP from "./step1/PATCreditorStepFCreditorMDP";
import PATPPFAPaymentPlanMDP from "./step2/PATPPFAPaymentPlanMDP";

import PATFinalStepFFormMDP from "./step3/PATFinalStepFFormMDP";

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

    const patppFAPaymentPlanMDP =  new PATPPFAPaymentPlanMDP({
      parent: this,
      taskRoot: this.taskRoot,
    })

    this.addStep({
      name: "Creditor",
      stepContent: new PATCreditorStepFCreditorMDP({
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
        name: "Mark Complete",
        stepContent: new PATFinalStepFFormMDP({
          parent: this,
          taskRoot: this.taskRoot,
        }),
      });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
