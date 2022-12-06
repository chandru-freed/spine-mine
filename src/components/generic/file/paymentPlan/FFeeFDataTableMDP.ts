import FCellDateMDP from "../../table/cell/FCellDateMDP";
import FCellCurrencyMDP from "../../table/cell/FCellCurrencyMDP";
import FCellStatusMDP from "../../table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "../../table/FDataTableMDP";

export default class FFeeFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({  title: "Fee Payment Schedule",myRefName:"fFeeFDataTableMDP" });
        this.parent = parent;
        this.addColumn({
            label: "Draft Date",
            dataSelectorKey: "draftDate",
            columnCellMDP: new FCellDateMDP()
        }).addColumn({ label: "Fee Code", dataSelectorKey: "feeCode", columnCellMDP: new FCellCurrencyMDP({}) })
            .addColumn({ label: "Amount", dataSelectorKey: "amount", columnCellMDP: new FCellCurrencyMDP({}) })
            .addColumn({ label: "Tax Amount", dataSelectorKey: "taxAmount", columnCellMDP: new FCellCurrencyMDP({}) })
            .addColumn({ label: "Total Amount", dataSelectorKey: "totalAmount", columnCellMDP: new FCellStatusMDP({}) })
            .addColumn({ label: "Payment Status", dataSelectorKey: "paymentStatus", columnCellMDP: new FCellStatusMDP({}) });
    }
}