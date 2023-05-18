import FDataTableMDP from "@/components/generic/table/FDataTableMDP";
import FInfoINRMDP from "@/components/generic/table/info/FInfoINRMDP";

export default class FNupaySummaryFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ myRefName: "NupaySummaryRef" });
        this.parent = parent;
        this
            .addColumn({
                label: "Nupay Customer Id",
                dataSelectorKey: "nupayCustomerId"
            }).addCurrencyColumn({
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
                dataSelectorKey: "customerName",
                hidden: true
            }).addInfo({
                label:"Collection Amount",
                value:this.parent.nupayPaymentConsolidation.totalCollectionAmount,
                infoMDP: new FInfoINRMDP({})
            })
            .addInfo({
                label:"Partner Amount",
                value:this.parent.nupayPaymentConsolidation.totalParterAmount,
                infoMDP: new FInfoINRMDP({})
            })
            .addInfo({
                label:"Trust Amount",
                value:this.parent.nupayPaymentConsolidation.totalTrustAmount,
                infoMDP: new FInfoINRMDP({})
            })
    }
}
