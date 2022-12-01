import FCellDateMDP from "../../table/cell/FCellDateMDP";
import FCellINRMDP from "../../table/cell/FCellINRMDP";
import FCellStatusMDP from "../../table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "../../table/FDataTableMDP";

export default class FFeeFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({  title: "Payment Schedule",myRefName:"fFeeFDataTableMDP" });
        this.parent = parent;
        this.addColumn({
            label: "Draft Date",
            dataSelectorKey: "draftDate",
            columnCellMDP: new FCellDateMDP()
        }).addColumn({ label: "Fee Code", dataSelectorKey: "feeCode", columnCellMDP: new FCellINRMDP() })
            .addColumn({ label: "Amount", dataSelectorKey: "amount", columnCellMDP: new FCellINRMDP() })
            .addColumn({ label: "Tax Amount", dataSelectorKey: "taxAmount", columnCellMDP: new FCellINRMDP() })
            .addColumn({ label: "Total Amount", dataSelectorKey: "totalAmount", columnCellMDP: new FCellStatusMDP() })
            .addColumn({ label: "Payment Status", dataSelectorKey: "paymentStatus", columnCellMDP: new FCellStatusMDP() });
    }
}