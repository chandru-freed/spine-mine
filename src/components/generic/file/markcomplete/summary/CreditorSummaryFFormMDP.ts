
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FDataTableMDP from "@/components/generic/table/FDataTableMDP";

export default class CreditorSummaryFFormMDP extends FDataTableMDP {
    childMDP = new FFormChildMDP();
    constructor() {
        super({
            dataSelectorKey: "creditorList"
        });
        this.addColumn({
            label: "Creditor Name",
            dataSelectorKey:"creditorName"
        }).addColumn({
            label: "Type",
            dataSelectorKey:"debtType"
        }).addColumn({
            label: "Outstanding Amount",
            dataSelectorKey:"creditorBalance"
        });
    }

}