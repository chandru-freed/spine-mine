


import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class BudgetSummaryFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    constructor() {
        super({
            myRefName: "budgetSummaryFForm",

        });

        this.addField(new FTextFieldMDP({
            dataSelectorKey: "budgetSummary.totalIncome",
            label: "Total Income",
            parentMDP: this.childMDP,
            readonly: true,
            boundaryClass: "col-4"
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "budgetSummary.availableIncome",
            label: "Available Income",
            parentMDP: this.childMDP,
            readonly: true,
            boundaryClass: "col-4"
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "budgetSummary.proposedDSPayment",
            label: "Proposed DSPayment",
            parentMDP: this.childMDP,
            readonly: true,
            boundaryClass: "col-4"
        }))
    }

}