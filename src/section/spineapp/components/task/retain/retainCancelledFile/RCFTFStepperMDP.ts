import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import ECFTProfileStepMDP from "./step1/RCFTProfileStepMDP";
import ECFTCreditorStepFCreditorMDP from "./step2/RCFTCreditorStepFCreditorMDP";
import ECFTBudgetStepFBudgetMDP from "./step3/RCFTBudgetStepFBudgetMDP";
import ECFTPaymentPlanStepFPaymentPlanMDP from "./step4/RCFTPaymentPlanStepFPaymentPlanMDP";

import ECFTUploadStepFDocumentMDP from "./step5/RCFTUploadStepFDocumentMDP";
import ECFTSummaryStepMDP from "./step6/RCFTSummaryStepMDP";
import ECFTSSAStepMDP from "./step7/RCFTSSAStepMDP";
import ECFTEMandateListStepMDP from "./step8/RCFTEMandateListStepMDP";
import ECFTCashfreeStepMDP from "./step9/RCFTCashfreeStepMDP";
import BudgetExceptionMDP from "./step3/BudgetExceptionMDP";


export default class RCFTFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "retainCancelledInfoStepperRef",
      linearProgress: !taskRoot.taskDisabled,
      actionable: !taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    const ccitProfileStepMDP = new ECFTProfileStepMDP({
      taskRoot: this.taskRoot,
      parent: this,
    });

    const ccitBudgetStepFBudgetMDP = new ECFTBudgetStepFBudgetMDP({
      taskRoot: this.taskRoot,
      parent: this,
    });


    const ccitPPStepFPaymentPlanMDP = new ECFTPaymentPlanStepFPaymentPlanMDP({
      taskRoot: this.taskRoot,
      parent: this,
    });

    const ccitUploadStepFDocumentMDP = new ECFTUploadStepFDocumentMDP({
      taskRoot: this.taskRoot,
      parent: this,
    });
    const summaryStep = new ECFTSummaryStepMDP({
      taskRoot: this.taskRoot, parent: this
    });

    this.addStep({
        name: "Creditor",
        stepContent: new ECFTCreditorStepFCreditorMDP({
          taskRoot: this.taskRoot,
          parent: this,
        }),
      })
      .addStep({
        name: "Budget",
        stepContent: ccitBudgetStepFBudgetMDP,
        submitFunc: ccitBudgetStepFBudgetMDP.validateAndSubmit(),
        preCondition: ccitBudgetStepFBudgetMDP.getBudgetPreCondition(),
        preConditionMDP:new BudgetExceptionMDP({taskRoot, parent}),
        preConditionErrorMsg: "Hardship check failed"
      })
      .addStep({
        name: "Payment Plan",
        stepContent: ccitPPStepFPaymentPlanMDP,
        submitFunc: ccitPPStepFPaymentPlanMDP.validateEntries()
      }).addStep({
        name: "Profile",
        stepContent: ccitProfileStepMDP,
        submitFunc: ccitProfileStepMDP.validateAndSubmit(),
      })
      .addStep({
        name: "Document",
        stepContent: ccitUploadStepFDocumentMDP,
        submitFunc: ccitUploadStepFDocumentMDP.validateDocuments()
      }).addStep({
        name: "Summary",
        stepContent: summaryStep,
        submitFunc: summaryStep.validateAndSubmit()
      }).addStep({
        name: "Agreement",
        stepContent: new ECFTSSAStepMDP({
          taskRoot: this.taskRoot, parent: this
        }),
      }).addStep({
        name: "EMandate",
        stepContent: new ECFTEMandateListStepMDP({
          taskRoot: this.taskRoot, parent: this
        }),
      }).addStep({
        name: "Cashfree",
        stepContent: new ECFTCashfreeStepMDP({
          taskRoot: this.taskRoot, parent: this
        }),
      })
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
