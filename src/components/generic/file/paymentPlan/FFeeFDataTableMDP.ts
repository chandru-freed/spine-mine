import { FColumnDateMDP } from "../../table/cell/FColumnDateMDP";
import { FColumnINRMDP } from "../../table/cell/FColumnINRMDP";
import { FColumnStatusMDP } from "../../table/cell/FColumnStatusMDP";
import FDataTableMDP, { ActionType } from "../../table/FDataTableMDP";

export default class FFeeFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({  title: "Payment Schedule" });
        this.parent = parent;
        this.addColumn({
            label: "Draft Date",
            dataSelectorKey: "draftDate",
            columnCellMDP: new FColumnDateMDP()
        }).addColumn({ label: "Fee Code", dataSelectorKey: "feeCode", columnCellMDP: new FColumnINRMDP() })
            .addColumn({ label: "Amount", dataSelectorKey: "amount", columnCellMDP: new FColumnINRMDP() })
            .addColumn({ label: "Tax Amount", dataSelectorKey: "taxAmount", columnCellMDP: new FColumnINRMDP() })
            .addColumn({ label: "Total Amount", dataSelectorKey: "totalAmount", columnCellMDP: new FColumnStatusMDP() })
            .addColumn({ label: "Payment Status", dataSelectorKey: "paymentStatus", columnCellMDP: new FColumnStatusMDP() });
    }
}