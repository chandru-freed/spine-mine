import MDP from "@/components/generic/MDP";
import FBtnMDP from "../../FBtnMDP";
import StepSummaryMDP from "./summary/StepSummaryMDP";
import CreditorSummaryFFormMDP from "./summary/CreditorSummaryFFormMDP";
import ProfileSummaryFFormMDP from "./summary/ProfileSummaryFFormMDP";
import BudgetSummaryFFormMDP from "./summary/BudgetSummaryFFormMDP";
import PaymentPlanSummaryFFormMDP from "./summary/PaymentPlanSummaryFFormMDP";
import BankInfoSummaryFFormMDP from "./summary/BankInfoSummaryFFormMDP";
import DocumentSummaryFFormMDP from "./summary/DocumentSummaryFFormMDP";

export default class FMarkCompleteMDP implements MDP {
    componentName: string = "FMarkComplete";
    actionList: FBtnMDP[] = [];
    constructor() {
    }

    addAction(newAction: FBtnMDP) {
        this.actionList.push(newAction);
        console.log(this.actionList)
        return this;
    }
    getClientInfoSummaryMetaData() {
        return new StepSummaryMDP()
            .addSummary({
                name: "Profile",
                content: new ProfileSummaryFFormMDP(),
                stepIndex:0
            }).addSummary({
                name: "Creditor",
                content: new CreditorSummaryFFormMDP(),
                stepIndex:1
            }).addSummary({
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
                stepIndex:4
                
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
                clientInfoSummaryMetaData: this.getClientInfoSummaryMetaData()
            }
        }
    }



}

