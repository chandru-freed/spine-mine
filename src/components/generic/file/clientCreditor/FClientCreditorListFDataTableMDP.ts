import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import FInfoINRMDP from "../../table/info/FInfoINRMDP";

export default class FClientCreditorListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ title: "Excluded Creditors", myRefName: "FClientCreditorListRef", itemKey:"clCreditorId" });
        this.parent = parent;
        this
            .addColumn({
                label: "Creditor Name",
                dataSelectorKey: "creditorName"
            }).addCurrencyColumn({
                label: "Creditor Balance",
                dataSelectorKey: "creditorBalance"
            }).addCurrencyColumn({
                label: "EMI Amount",
                dataSelectorKey: "emiAmount"
            }).addDateColumn({
                label: "Last Date Of Payment",
                dataSelectorKey: "lastDateOfPayment"
            }).addStatusColumn({
                label: "Debt Type",
                dataSelectorKey: "debtType"
            }).addColumn({
                label: "Account Number",
                dataSelectorKey: "accountNumber"
            }).addColumn({
                label: "Details",
                dataSelectorKey: "details"
            })
            .addAction({
                label: "Include to program",
                onClick: this.handleIncludeClick(),
                type: ActionType.OTHERS
            })
            .addInfo({
                label: "Total Amount",
                value:this.parent.totalCreditorBalance,
                infoMDP: new FInfoINRMDP({})
            })
    }

    handleIncludeClick() {
        return (item: any) => {
            return new Promise(resolve => {
                this.parent.handleIncludeCreditor(item);
                resolve(true);
            })
        }

    }
}
