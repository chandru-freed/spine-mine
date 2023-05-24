import FBtnMDP from "@/components/generic/FBtnMDP";
import BankInfoSummaryFFormMDP from "@/components/generic/file/summary/BankInfoSummaryFFormMDP";
import BudgetSummaryFFormMDP from "@/components/generic/file/summary/BudgetSummaryFFormMDP";
import CreditorSummaryFDataTableMDP from "@/components/generic/file/summary/CreditorSummaryFDataTableMDP";
import DocumentSummaryFFormMDP from "@/components/generic/file/summary/DocumentSummaryFFormMDP";
import PaymentPlanSummaryFFormMDP from "@/components/generic/file/summary/PaymentPlanSummaryFFormMDP";
import ProfileSummaryFFormMDP from "@/components/generic/file/summary/ProfileSummaryFFormMDP";
import StepSummaryMDP from "@/components/generic/file/summary/StepSummaryMDP";
import FFormMDP from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
import Task from "@/section/spineapp/util/Task";
import ExceptionFFormMDP from "./ExceptionFFormMDP";
import * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";


export default class RCFTSummaryStepMDP implements MDP {
    componentName: string = "ECFTSummaryStep";
    formList: FFormMDP[] = [];
    actionList: FBtnMDP[] = [];
    taskRoot: any;
    parent: any;
    myRefName = "summaryStepRef"
    constructor({ taskRoot, parent }: { taskRoot: any, parent: any }) {
        this.taskRoot = taskRoot;
        this.parent = parent;
        this.addForm(new ExceptionFFormMDP({ taskRoot, parent }))
    }

    addAction(newAction: FBtnMDP) {
        this.actionList.push(newAction);
        return this;
    }

    addForm(newForm: FFormMDP) {
        this.formList.push(newForm);
        return this;
    }
    validateAndSubmit() {
        return (nextCallback: () => void) => {
            this.getExceptionFormRef().submitForm(() => {
                const {haveException} = this.taskRoot.taskFormData.taskOutput;
                const input = new Data.ClientFile.UpdateExceptionTakenListInput();
                if(haveException === "NO") {
                    input.exceptionTakenList = ["NO"]
                } else if (haveException === "YES") {
                    input.exceptionTakenList = this.taskRoot.taskFormData.taskOutput.exceptionTakenList;
                    input.exceptionApprovedBy = this.taskRoot.taskFormData.taskOutput.exceptionApprovedBy;
                    const noIndex = input.exceptionTakenList.indexOf("NO");
                    if(noIndex !== -1) {
                    input.exceptionTakenList.splice(noIndex, 1);
                    }
                }
                input.clientFileId = this.taskRoot.clientFileId;
                Action.ClientFile.UpdateExceptionTakenList.execute(input, (output) => {
                    if(nextCallback) {
                    nextCallback();
                    }
                });
            });

        }
    }

    getMyRef() {
        return this.parent.getMyRef().$refs[this.myRefName];
    }

    getExceptionFormRef() {
        return this.getMyRef()[0].$refs['exceptionFFormRef'][0];
    }

    getClientInfoSummaryMetaData() {
        return new StepSummaryMDP({ parent: this.parent })

            .addSummary({
                name: "Creditor",
                content: new CreditorSummaryFDataTableMDP({ taskRoot: this.taskRoot }),
                stepIndex: 0,
            })
            .addSummary({
                name: "Budget",
                content: new BudgetSummaryFFormMDP(),
                stepIndex: 1

            }).addSummary({
                name: "Payment Plan",
                content: new PaymentPlanSummaryFFormMDP(),
                stepIndex: 2

            })
            .addSummary({
                name: "Profile",
                content: new ProfileSummaryFFormMDP(),
                stepIndex: 3
            })
            // .addSummary({
            //     name: "Bank Info",
            //     content: new BankInfoSummaryFFormMDP(),
            //     stepIndex:4

            // })
            .addSummary({
                name: "Documents",
                content: new DocumentSummaryFFormMDP(),
                stepIndex: 4

            })

            .getMetaData()
    }

    getMetaData(): object {
        return {
            componentName: this.componentName,
            myRefName: this.myRefName,
            props: {
                actionMetaDataList: this.actionList.map((action) =>
                    action.getMetaData(),
                ),
                clientInfoSummaryMetaData: this.getClientInfoSummaryMetaData(),
                formMetaDataList: this.formList.map((form) =>
                    form.getMetaData()
                ),
            }
        }
    }



}

