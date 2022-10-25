
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class BankInfoSummaryFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    constructor() {
        super({
            myRefName: "bankInfoSummaryFForm",

        });

        this.addField(new FTextFieldMDP({
            dataSelectorKey: "bankSummary.accountNumber",
            label: "Account Number",
            parentMDP: this.childMDP,
            readonly: true,
            boundaryClass: "col-4"
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "bankSummary.bankName",
            label: "Bank Name",
            parentMDP: this.childMDP,
            readonly: true,
            boundaryClass: "col-4"
        }))
    }

}