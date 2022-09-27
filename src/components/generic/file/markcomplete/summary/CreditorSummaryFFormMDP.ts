
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class CreditorSummaryFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    constructor() {
        super({
            myRefName: "creditorSummaryFForm",

        });

        this.addField(new FTextFieldMDP({
            dataSelectorKey: "creditorInfo.creditosCount",
            label: "Number Of Creditors",
            parentMDP: this.childMDP,
            readonly: true,
            boundaryClass: "col-4"
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "creditorInfo.totalDebtAmount",
            label: "Total Debt Amount",
            parentMDP: this.childMDP,
            readonly: true,
            boundaryClass: "col-4"
        }))
    }

}