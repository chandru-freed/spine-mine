import FDataTableMDP from "@/components/generic/table/FDataTableMDP";

export default class FNupayCibListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ myRefName: "NupayCibListRef", dataSelectorKey: "cibList" });
        this.parent = parent;
        this
            .addDateColumn({
                label: "Created On",
                dataSelectorKey: "createdOn"
            }).addColumn({
                label: "Nupay Ref No",
                dataSelectorKey: "nupayRefNo"
            }).addColumn({
                label: "Nupay Customer Id",
                dataSelectorKey: "nupayCustomerId"
            }).addClientFileNumberColumn({
                label: "Client File Number",
                dataSelectorKey: "clientFileNumber"
            }).addColumn({
                label: "Beneficiary Name",
                dataSelectorKey: "beneficiaryName"
            }).addCurrencyColumn({
                label: "Amount",
                dataSelectorKey: "amount"
            }).addColumn({
                label: "Beneficiary Account No",
                dataSelectorKey: "beneficiaryAccountNo"
            }).addColumn({
                label: "Ifsc Code",
                dataSelectorKey: "ifscCode"
            }).addColumn({
                label: "Txn Type",
                dataSelectorKey: "txnType"
            }).addStatusColumn({
                label: "Txn Status",
                dataSelectorKey: "txnStatus"
            }).addColumn({
                label: "Utr",
                dataSelectorKey: "utr"
            }).addDateColumn({
                label: "Last Updated On",
                dataSelectorKey: "lastUpdatedOn"
            })
    }
}
