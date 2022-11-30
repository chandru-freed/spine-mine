import { FColumnDateMDP } from "../../table/cell/FColumnDateMDP";
import { FColumnINRMDP } from "../../table/cell/FColumnINRMDP";
import { FColumnStatusMDP } from "../../table/cell/FColumnStatusMDP";
import FDataTableMDP, { ActionType } from "../../table/FDataTableMDP";

export default class FPaymentScheduleFDataTableMDP extends FDataTableMDP {
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
            .addColumn({ label: "Status", dataSelectorKey: "status", columnCellMDP: new FColumnStatusMDP() });


        this.addAction({
            label: "Present",
            onClick: (item) => { this.handlePresentClick(item) },
            type: ActionType.OTHERS,
        }).addAction({
            label: "Skip",
            onClick: (item) => { this.handleSkipClick(item) },
            type: ActionType.OTHERS,
        });

    }
    handlePresentClick(item: any) {
        this.parent.presentPSEntry(item.psEntryId)
    }

    handleSkipClick(item: any) {
        this.parent.skip(item.psEntryId)
    }
}