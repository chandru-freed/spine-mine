import { FColumnDateMDP } from "../../table/cell/FColumnDateMDP";
import { FColumnINRMDP } from "../../table/cell/FColumnINRMDP";
import { FColumnStatusMDP } from "../../table/cell/FColumnStatusMDP";
import FDataTableMDP, { ActionType } from "../../table/FDataTableMDP";

export default class FPSkipedPresentedFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ itemKey: "psEntryId", disabled: parent.disabledActionBtn, title: "Payment Schedule" });
        this.parent = parent;
        this.addColumn({
            label: "Draft Date",
            dataSelectorKey: "draftDate",
            columnCellMDP: new FColumnDateMDP()
        }).addColumn({ label: "Total Amount", dataSelectorKey: "totalAmount", columnCellMDP: new FColumnINRMDP() })
            .addColumn({ label: "Settlement Amount", dataSelectorKey: "settlementReserve", columnCellMDP: new FColumnINRMDP() })
            .addColumn({ label: "Fee Amount", dataSelectorKey: "feeAmount", columnCellMDP: new FColumnINRMDP() })
            .addColumn({ label: "Status", dataSelectorKey: "status", columnCellMDP: new FColumnStatusMDP() })
            .addColumn({ label: "Payment Status", dataSelectorKey: "paymentStatus", columnCellMDP: new FColumnStatusMDP() });
    }

    
}