import FStepperMDP from "@/components/generic/FStepperMDP";
import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";

import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import UTProfileStepFProfileFFormMDP from "./step1/UTProfileStepFProfileFFormMDP";
import UTCreditorStepFCreditorFFormMDP from "./step2/UTCreditorStepFCreditorFFormMDP";
import { UTBudgetStepFBudgetMDP } from "./step3/UTBudgetStepFBudgetMDP";
import UTPaymentPlanStepFPaymentPlanMDP from "./step4/UTPaymentPlanStepFPaymentPlanMDP";
import UTBankStepFBankFFormMDP from "./step5/UTBankStepFBankFFormMDP";
import UTUploadStepFDocumentMDP from "./step6/UTUploadStepFDocumentMDP";
import UTApprovedStepFFormMDP from "./step7/UTApprovedStepFFormMDP";

export default class UTFStepperMDP extends FTaskStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({
      myRefName: "underwrittingStepperRef",
      actionable: !taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;


    const utApprovedStepFFormMDP = new UTApprovedStepFFormMDP({
      taskRoot: taskRoot,
      parent: this,
    })

    this.addStep({
      name: "Profile",
      stepContent: new UTProfileStepFProfileFFormMDP({
        taskRoot: taskRoot,
        parent: this,
      }),
    })
      .addStep({
        name: "Creditor",
        stepContent: new UTCreditorStepFCreditorFFormMDP({
          taskRoot: taskRoot,
          parent: this,
        }),
      })
      .addStep({
        name: "Budget",
        stepContent: new UTBudgetStepFBudgetMDP({
          taskRoot: taskRoot,
          parent: this,
        }),
      })
      .addStep({
        name: "Payment",
        stepContent: new UTPaymentPlanStepFPaymentPlanMDP({
          taskRoot: taskRoot,
          parent: this,
        }),
      })
      .addStep({
        name: "Bank",
        stepContent: new UTBankStepFBankFFormMDP({
          taskRoot: this.taskRoot,
          parent: this,
        }),
      })
      .addStep({
        name: "Document",
        stepContent: new UTUploadStepFDocumentMDP({
          taskRoot: this.taskRoot,
          parent: this,
        }),
      })
      .addStep({
        name: "Approve",
        stepContent: utApprovedStepFFormMDP,
        submitFunc: utApprovedStepFFormMDP.validateAndSubmit()
      });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
