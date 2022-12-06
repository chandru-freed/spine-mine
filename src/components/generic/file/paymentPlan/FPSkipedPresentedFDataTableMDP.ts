import FCellDateMDP from "../../table/cell/FCellDateMDP";
import FCellCurrencyMDP from "../../table/cell/FCellCurrencyMDP";
import FCellStatusMDP from "../../table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "../../table/FDataTableMDP";

export default class FPSkipedPresentedFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ itemKey: "psEntryId", disabled: parent.disabledActionBtn, title: "Payment Schedule",myRefName: "fpSkipedPresentedFDataTableMDP" });
        this.parent = parent;
        this.addColumn({
            label: "Draft Date",
            dataSelectorKey: "draftDate",
            columnCellMDP: new FCellDateMDP()
        }).addColumn({ label: "Total Amount", dataSelectorKey: "totalAmount", columnCellMDP: new FCellCurrencyMDP({}) })
            .addColumn({ label: "Settlement Amount", dataSelectorKey: "settlementReserve", columnCellMDP: new FCellCurrencyMDP({}) })
            .addColumn({ label: "Fee Amount", dataSelectorKey: "feeAmount", columnCellMDP: new FCellCurrencyMDP({}) })
            .addColumn({ label: "Status", dataSelectorKey: "status", columnCellMDP: new FCellStatusMDP() })
            .addColumn({ label: "Payment Status", dataSelectorKey: "paymentStatus", columnCellMDP: new FCellStatusMDP() });
    }

    
}