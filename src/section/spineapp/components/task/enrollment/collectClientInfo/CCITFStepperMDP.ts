import FStepperMDP from "@/components/generic/FStepperMDP";
import CCITMarkCompleteStepFFormMDP from "./step7/CCITMarkCompleteStepFFormMDP";
import CCITUploadStepFDocumentMDP from "./step6/CCITUploadStepFDocumentMDP";
import CCITCreditorStepFCreditorMDP from "./step2/CCITCreditorStepFCreditorMDP";
import CCITBudgetStepFBudgetMDP from "./step3/CCITBudgetStepFBudgetMDP";
import CCITPaymentPlanStepFPaymentPlanMDP from "./step4/CCITPaymentPlanStepFPaymentPlanMDP";
import CCITBankStepFBankFFormMDP from "./step5/CCITBankStepFBankFFormMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import CCITProfileStepMDP from "./step1/CCITProfileStepMDP";
import FFooStepperMDP from "@/components/generic/FFooStepperMDP";
import CCITFMarkCompleteMDP from "./step7/CCITFMarkCompleteMDP";
import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";

export default class CCITFStepperMDP extends FTaskStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({ myRefName: "collectClientInfoStepperRef", linearProgress: !taskRoot.taskDisabled, actionable: !taskRoot.taskDisabled });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    const ccitProfileStepMDP =new CCITProfileStepMDP({
      taskRoot: this.taskRoot,
      parent: this,
    });

    const ccitBudgetStepFBudgetMDP = new CCITBudgetStepFBudgetMDP({
      taskRoot: this.taskRoot,
      parent: this,
    })

   const ccitPaymentPlanStepFPaymentPlanMDP = new CCITPaymentPlanStepFPaymentPlanMDP({
      taskRoot: this.taskRoot,
      parent: this,

    })

   const ccitBankStepFBankFFormMDP = new CCITBankStepFBankFFormMDP({
      taskRoot: this.taskRoot,
      parent: this,
    })

   const ccitMarkCompleteMDP = new CCITFMarkCompleteMDP({
      taskRoot: this.taskRoot,
      parent: this
    })

    this.addStep({
      name: "Profile",
      stepContent: ccitProfileStepMDP,
      submitFunc: ccitProfileStepMDP.validateAndSubmit()
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
        stepContent: ccitBudgetStepFBudgetMDP,
        submitFunc: ccitBudgetStepFBudgetMDP.validateAndSubmit()
      })
      .addStep({
        name: "Payment Plan",
        stepContent: ccitPaymentPlanStepFPaymentPlanMDP,
        submitFunc: ccitPaymentPlanStepFPaymentPlanMDP.submit()
      })
      .addStep({
        name: "Bank",
        stepContent: ccitBankStepFBankFFormMDP,
        submitFunc: ccitBankStepFBankFFormMDP.validateAndSubmit()
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
        stepContent: ccitMarkCompleteMDP,
        submitFunc: ccitMarkCompleteMDP.submit()
      });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
