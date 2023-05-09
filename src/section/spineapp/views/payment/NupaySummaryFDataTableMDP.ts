import FDataTableMDP from "@/components/generic/table/FDataTableMDP";

export default class NupaySummaryFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ myRefName: "NupaySummaryRef" });
        this.parent = parent;
        this
            .addCurrencyColumn({
                label: "Total Collection Amount",
                dataSelectorKey: "totalCollectionAmount"
            }).addCurrencyColumn({
                label: "Total Partner Amount",
                dataSelectorKey: "totalParterAmount"
            }).addCurrencyColumn({
                label: "Total Trust Amount",
                dataSelectorKey: "totalTrustAmount"
            }).addColumn({
                label: "Customer Name",
                dataSelectorKey: "customerName"
            }).addColumn({
                label: "Nupay Customer Id",
                dataSelectorKey: "nupayCustomerId"
            }).addInfo({
                label:"Collection Amount",
                value:this.parent.nupayPaymentConsolidation.totalTrustAmount
            })
            .addInfo({
                label:"Partner Amount",
                value:this.parent.nupayPaymentConsolidation.totalParterAmount
            })
            .addInfo({
                label:"Trust Amount",
                value:this.parent.nupayPaymentConsolidation.totalTrustAmount
            })
    }
}
