import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import MCITProfileStepMDP from "./step1/MCITProfileStepMDP";
import MCITCreditorStepFCreditorMDP from "./step2/MCITCreditorStepFCreditorMDP";
import MCITBudgetStepFBudgetMDP from "./step3/MCITBudgetStepFBudgetMDP";
import MCITPaymentPlanStepFPaymentPlanMDP from "./step4/MCITPaymentPlanStepFPaymentPlanMDP";
import MCITBankStepFBankFFormMDP from "./step5/MCITBankStepFBankFFormMDP";
import MCITUploadStepFDocumentMDP from "./step6/MCITUploadStepFDocumentMDP";
import MCITFMarkCompleteMDP from "./step7/MCITFMarkCompleteMDP";
import MCITMarkCompleteStepFFormMDP from "./step7/MCITMarkCompleteStepFFormMDP";

export default class MCITFStepperMDP extends FTaskStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({
      myRefName: "manageClientInfoStepperRef",
      linearProgress: !taskRoot.taskDisabled,
      actionable: !taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    const mcitProfileStepMDP = new MCITProfileStepMDP({
      taskRoot: taskRoot,
      parent: this,
    });

    const mcitBudgetStepFBudgetMDP = new MCITBudgetStepFBudgetMDP({
      taskRoot: taskRoot,
      parent: this,
    });

    const mcitBankStepFBankFFormMDP = new MCITBankStepFBankFFormMDP({
      taskRoot: taskRoot,
      parent: this,
    });

    const ccitPPStepFPaymentPlanMDP = new MCITPaymentPlanStepFPaymentPlanMDP({
      taskRoot: this.taskRoot,
      parent: this,
    });

    this.addStep({
      name: "Profile",
      stepContent: mcitProfileStepMDP,
      submitFunc: mcitProfileStepMDP.validateAndSubmit(),
    })
      .addStep({
        name: "Creditor",
        stepContent: new MCITCreditorStepFCreditorMDP({
          taskRoot: taskRoot,
          parent: this,
        }),
      })
      .addStep({
        name: "Budget",
        stepContent: mcitBudgetStepFBudgetMDP,
        submitFunc: mcitBudgetStepFBudgetMDP.validateAndSubmit(),
      })
      .addStep({
        name: "Payment Plan",
        stepContent: new MCITPaymentPlanStepFPaymentPlanMDP({
          taskRoot: taskRoot,
          parent: this,
        }),
        // submitFunc: ccitPPStepFPaymentPlanMDP.ppCalculatorFormSubmit(),
      })
      .addStep({
        name: "Bank",
        stepContent: mcitBankStepFBankFFormMDP,
        submitFunc: mcitBankStepFBankFFormMDP.validateAndSubmit(),
      })
      .addStep({
        name: "Document",
        stepContent: new MCITUploadStepFDocumentMDP({
          taskRoot: taskRoot,
          parent: this,
        }),
      })
      .addStep({
        name: "Verify",
        stepContent: new MCITFMarkCompleteMDP({
          taskRoot: taskRoot,
          parent: this,
        }),
      });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
