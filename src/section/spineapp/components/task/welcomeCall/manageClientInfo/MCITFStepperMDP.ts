
import FStepperMDP from "@/components/generic/FStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/ManualTaskIntf";
import MCITProfileStepFProfileFFormMDP from "./step1/MCITProfileStepFProfileFFormMDP";
import MCITCreditorStepFCreditorMDP from "./step2/MCITCreditorStepFCreditorMDP";
import MCITBudgetStepFBudgetMDP from "./step3/MCITBudgetStepFBudgetMDP";
import MCITPaymentPlanStepFPaymentPlanMDP from "./step4/MCITPaymentPlanStepFPaymentPlanMDP";
import MCITBankStepFBankFFormMDP from "./step5/MCITBankStepFBankFFormMDP";
import MCITUploadStepFDocumentMDP from "./step6/MCITUploadStepFDocumentMDP";
import MCITMarkCompleteStepFFormMDP from "./step7/MCITMarkCompleteStepFFormMDP";



export default class MCITFStepperMDP extends FStepperMDP {
    taskRoot: ManualTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
        super({ myRefName: "manageClientInfoStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;
        this.addStep({
            name: "Profile",
            stepContent: new MCITProfileStepFProfileFFormMDP({
                taskRoot: taskRoot,
                parent: this,
            })
        }).addStep({
            name: "Creditor",
            stepContent: new MCITCreditorStepFCreditorMDP({
                taskRoot: taskRoot,
                parent: this,
            })
        }).addStep({
            name: "Budget",
            stepContent: new MCITBudgetStepFBudgetMDP({
                taskRoot: taskRoot,
                parent: this,
            })
        }).addStep({
            name: "Payment Plan",
            stepContent: new MCITPaymentPlanStepFPaymentPlanMDP({
                taskRoot: taskRoot,
                parent: this,
            })
        }).addStep({
            name: "Bank",
            stepContent: new MCITBankStepFBankFFormMDP({
                taskRoot: taskRoot,
                parent: this,
            })
        }).addStep({
            name: "Document",
            stepContent: new MCITUploadStepFDocumentMDP({
                taskRoot: taskRoot,
                parent: this,
            })
        }).addStep({
            name: "Verify",
            stepContent: new MCITMarkCompleteStepFFormMDP({
                taskRoot: taskRoot,
                parent: this,
            })
        })
        
    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
