import FStepperMDP from "@/components/generic/FStepperMDP";
import { CollectClientInfoTaskIntf } from "./CollectClientInfoTaskIntf";
import CCITMarkCompleteStepFFormMDP from "./step7/CCITMarkCompleteStepFFormMDP";
import CCITUploadStepFDocumentMDP from "./step6/CCITUploadStepFDocumentMDP";
import CCITCreditorStepFCreditorMDP from "./step2/CCITCreditorStepFCreditorMDP";
import CCITBudgetStepFBudgetMDP from "./step3/CCITBudgetStepFBudgetMDP";
import CCITPaymentPlanStepFPaymentPlanMDP from "./step4/CCITPaymentPlanStepFPaymentPlanMDP";
import CCITBankStepFBankFFormMDP from "./step5/CCITBankStepFBankFFormMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import CCITProfileStepMDP from "./step1/CCITProfileStepMDP";

export default class CCITFStepperMDP extends FStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({ myRefName: "collectClientInfoStepperRef" });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Profile",
      stepContent: new CCITProfileStepMDP({
        taskRoot: this.taskRoot,
        parent: this,
      }),
    })
      .addStep({
        name: "Creditor",
        stepContent: new CCITCreditorStepFCreditorMDP({
          taskRoot: this.taskRoot,
          parent: this,
        }),
      })
      .addStep({
        name: "Budget",
        stepContent: new CCITBudgetStepFBudgetMDP({
          taskRoot: this.taskRoot,
          parent: this,
        }),
      })
      .addStep({
        name: "Payment Plan",
        stepContent: new CCITPaymentPlanStepFPaymentPlanMDP({
          taskRoot: this.taskRoot,
          parent: this,

        }),
      })
      .addStep({
        name: "Bank",
        stepContent: new CCITBankStepFBankFFormMDP({
          taskRoot: this.taskRoot,
          parent: this,
        }),
      })
      .addStep({
        name: "Document",
        stepContent: new CCITUploadStepFDocumentMDP({
          taskRoot: this.taskRoot,
          parent: this
        }),
      })
      .addStep({
        name: "Verify",
        stepContent: new CCITMarkCompleteStepFFormMDP({
          taskRoot: this.taskRoot,
          parent: this,
        }),
      });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
