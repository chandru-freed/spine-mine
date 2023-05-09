import FDataTableMDP from "@/components/generic/table/FDataTableMDP";

export default class NupayTransactionListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ myRefName: "NupayTransactionListRef", dataSelectorKey: "transactionList" });
        this.parent = parent;
        this
            .addDateColumn({
                label: "Value Date",
                dataSelectorKey: "valueDate"
            }).addClientFileNumberColumn({
                label: "Client File Number",
                dataSelectorKey: "clientFileNumber"
            }).addColumn({
                label: "Narration",
                dataSelectorKey: "narration"
            }).addCurrencyColumn({
                label: "Amount",
                dataSelectorKey: "amount"
            }).addColumn({
                label: "Txn Type",
                dataSelectorKey: "txnType"
            }).addColumn({
                label: "Utr",
                dataSelectorKey: "utr"
            }).addStatusColumn({
                label: "Status",
                dataSelectorKey: "status"
            }).addColumn({
                label: "Nupay Ref No",
                dataSelectorKey: "nupayRefNo"
            })
    }
}
