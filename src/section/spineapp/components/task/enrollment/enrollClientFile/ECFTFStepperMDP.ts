import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import ECFTProfileStepMDP from "./step1/ECFTProfileStepMDP";
import ECFTCreditorStepFCreditorMDP from "./step2/ECFTCreditorStepFCreditorMDP";
import ECFTBudgetStepFBudgetMDP from "./step3/ECFTBudgetStepFBudgetMDP";
import ECFTPaymentPlanStepFPaymentPlanMDP from "./step4/ECFTPaymentPlanStepFPaymentPlanMDP";

import ECFTUploadStepFDocumentMDP from "./step5/ECFTUploadStepFDocumentMDP";
import ECFTSummaryStepMDP from "./step6/ECFTSummaryStepMDP";
import ECFTSSAStepMDP from "./step7/ECFTSSAStepMDP";
import ECFTEMandateListStepMDP from "./step8/ECFTEMandateListStepMDP";


export default class ECFTFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "collectClientInfoStepperRef",
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
        stepContent: new ECFTSummaryStepMDP({
          taskRoot: this.taskRoot, parent: this
        }),
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
      })
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
