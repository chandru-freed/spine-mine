import FStepperMDP from "@/components/generic/FStepperMDP";
import { CollectClientInfoTaskIntf } from "./CollectClientInfoTaskIntf";
import FProfileFFormMDP from "@/components/generic/file/FProfileFFormMDP";
import CCITMarkCompleteStepFFormMDP from "./step7/CCITMarkCompleteStepFFormMDP";
import FCreditorMDP from "@/components/generic/file/creditor/FCreditorMDP";
import FBudgetMDP from "@/components/generic/file/budget/FBudgetMDP";
import FBankFFormMDP from "@/components/generic/file/FBankFFormMDP";
import FDocumentMDP from "@/components/generic/file/documentUpload/FDocumentMDP";
import FPaymentPlanMDP from "@/components/generic/file/paymentPlan/FPaymentPlanMDP";
import CCITUploadStepFDocumentMDP from "./step6/CCITUploadStepFDocumentMDP";

export default class CCITFStepperMDP extends FStepperMDP {
  taskRoot: CollectClientInfoTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: CollectClientInfoTaskIntf }) {
    super({ myRefName: "collectClientInfoStepperRef" });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Profile",
      stepContent: new FProfileFFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
        myRefName: "clientInfoForm",
        dataSelectorKey: "taskOutput.clientInfo",
        disabled: taskRoot.taskDisabled,
      }),
    })
    .addStep({
      name: "Creditor",
      stepContent: new FCreditorMDP({
        taskRoot: this.taskRoot,
        parent: this,
        myRefName :"creditorRef",
        dataSelectorKey: "taskOutput.creditorInfo",
        disabled: this.taskRoot.taskDisabled,
      }),
    })
    .addStep({
      name: "Budget",
      stepContent: new FBudgetMDP({
        taskRoot: this.taskRoot,
        parent: this,
        myRefName: "budgetStepRef",
        dataSelectorKey: "taskOutput.budgetInfo",
        disabled: this.taskRoot.taskDisabled
      }),
    })
    .addStep({
      name: "Payment Plan",
      stepContent: new FPaymentPlanMDP({
        taskRoot: this.taskRoot,
        parent: this,
        myRefName: "paymentPlanRef",
        dataSelectorKey: "taskOutput",
        disabled: this.taskRoot.taskDisabled,
      }),
    })
    .addStep({
      name: "Bank",
      stepContent: new FBankFFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
        myRefName: "bankInfoForm",
        dataSelectorKey: "taskOutput.bankInfo",
        disabled: taskRoot.taskDisabled,
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
    console.log(this.parent.$refs);
    return this.taskRoot.$refs[this.myRefName];
  }
}
