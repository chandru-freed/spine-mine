import MDP from "@/components/generic/MDP";
import FBtnMDP from "../../FBtnMDP";
import StepSummaryMDP from "./summary/StepSummaryMDP";
import CreditorSummaryFDataTableMDP from "./summary/CreditorSummaryFDataTableMDP";
import ProfileSummaryFFormMDP from "./summary/ProfileSummaryFFormMDP";
import BudgetSummaryFFormMDP from "./summary/BudgetSummaryFFormMDP";
import PaymentPlanSummaryFFormMDP from "./summary/PaymentPlanSummaryFFormMDP";
import BankInfoSummaryFFormMDP from "./summary/BankInfoSummaryFFormMDP";
import DocumentSummaryFFormMDP from "./summary/DocumentSummaryFFormMDP";
import FFormMDP from "../../form/FFormMDP";

export default class FMarkCompleteMDP implements MDP {
    componentName: string = "FMarkComplete";
    formList: FFormMDP[] = [];
    actionList: FBtnMDP[] = [];
    taskRoot: any;
    parent: any;
    constructor({ taskRoot, parent }:{ taskRoot: any, parent: any }) {
        this.taskRoot = taskRoot;
        this.parent = parent;
    }

    addAction(newAction: FBtnMDP) {
        this.actionList.push(newAction);
        return this;
    }

    addForm(newForm: FFormMDP) {
        this.formList.push(newForm);
        return this;
    }

    getClientInfoSummaryMetaData() {
        return new StepSummaryMDP({parent: this.parent})
            .addSummary({
                name: "Profile",
                content: new ProfileSummaryFFormMDP(),
                stepIndex:0
            })
            .addSummary({
                name: "Creditor",
                content: new CreditorSummaryFDataTableMDP({taskRoot: this.taskRoot}),
                stepIndex:1,
            })
            .addSummary({
                name: "Budget",
                content: new BudgetSummaryFFormMDP(),
                stepIndex:2
                
            }).addSummary({
                name: "Payment Plan",
                content: new PaymentPlanSummaryFFormMDP(),
                stepIndex:3
                
            }).addSummary({
                name: "Bank Info",
                content: new BankInfoSummaryFFormMDP(),
                stepIndex:4
                
            }).addSummary({
                name: "Documents",
                content: new DocumentSummaryFFormMDP(),
                stepIndex:5
                
            })
            .getMetaData()
    }

    getMetaData(): object {
        return {
            componentName: this.componentName,
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

