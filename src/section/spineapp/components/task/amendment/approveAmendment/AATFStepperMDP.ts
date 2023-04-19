import FTaskStepperMDP, {
  FTaskStepMDP,
} from "@/components/generic/FTaskStepperMDP";
import AATCreditorStepFCreditorMDP from "./step1/AATCreditorStepFCreditorMDP";
import AATPPFAPaymentPlanMDP from "./step2/AATPPFAPaymentPlanMDP";

import AATApproveStepFFormMDP from "./step3/AATApproveStepFFormMDP";
import AATFinalStepFFormMDP from "./step4/AATFinalStepFFormMDP";

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
      name: "Review",
      stepContent: new AATApproveStepFFormMDP({
        parent: this,
        taskRoot: this.taskRoot,
      }),
    })
   .addStep({
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
        name: "Approve",
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
