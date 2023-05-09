import FDataTableMDP from "@/components/generic/table/FDataTableMDP";

export default class NupayPresentationListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({  myRefName: " NupayPresentationListRef", dataSelectorKey: "presentationList" });
        this.parent = parent;
        this
            .addColumn({
                label: "Nupay Ref No",
                dataSelectorKey: "nupayRefNo"
            }).addColumn({
                label: "Nupay Customer Id",
                dataSelectorKey: "nupayCustomerId"
            }).addCurrencyColumn({
                label: "Amount",
                dataSelectorKey: "amount"
            }).addDateColumn({
                label: "Presentation Date",
                dataSelectorKey: "presentationDate"
            }).addClientFileNumberColumn({
                label: "Client File Number",
                dataSelectorKey: "clientFileNumber"
            }).addStatusColumn({
                label: "Status",
                dataSelectorKey: "status"
            }).addColumn({
                label: "Reason Desc",
                dataSelectorKey: "reasonDesc"
            }).addColumn({
                label: "Ach Seq No",
                dataSelectorKey: "achSeqNo"
            }).addColumn({
                label: "Collection Mode",
                dataSelectorKey: "collectionMode"
            })
    }
}
