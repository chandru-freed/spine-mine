import FDataTableMDP from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";

export default class FNupayTransactionListFDataTableMDP extends FDataTableMDP {
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
                dataSelectorKey: "status",
                colorCodeData: Data.Color.PAYMENT_STATUS
            }).addColumn({
                label: "Nupay Ref No",
                dataSelectorKey: "nupayRefNo"
            })
    }
}
