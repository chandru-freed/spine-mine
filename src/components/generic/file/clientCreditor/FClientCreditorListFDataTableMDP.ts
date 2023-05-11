import FDataTableMDP from "@/components/generic/table/FDataTableMDP";

export default class FClientCreditorListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ title: "FClientCreditorList", myRefName: "FClientCreditorListRef" });
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
    }
}
