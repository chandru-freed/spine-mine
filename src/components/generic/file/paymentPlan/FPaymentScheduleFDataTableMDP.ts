import FCellDateMDP from "../../table/cell/FCellDateMDP";
import FCellINRMDP from "../../table/cell/FCellINRMDP";
import FCellStatusMDP from "../../table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "../../table/FDataTableMDP";

export default class FPaymentScheduleFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ itemKey: "psEntryId", disabled: parent.disabledActionBtn, title: "Payment Schedule",myRefName:"fPaymentScheduleFDataTableMDP" });
        this.parent = parent;
        this.addColumn({
            label: "Draft Date",
            dataSelectorKey: "draftDate",
            columnCellMDP: new FCellDateMDP()
        }).addColumn({ label: "Total Amount", dataSelectorKey: "totalAmount", columnCellMDP: new FCellINRMDP() })
            .addColumn({ label: "Settlement Amount", dataSelectorKey: "settlementReserve", columnCellMDP: new FCellINRMDP() })
            .addColumn({ label: "Fee Amount", dataSelectorKey: "feeAmount", columnCellMDP: new FCellINRMDP() })
            .addColumn({ label: "Status", dataSelectorKey: "status", columnCellMDP: new FCellStatusMDP() });


        this.addAction({
            label: "Present",
            onClick: (item) => { this.handlePresentClick(item) },
            type: ActionType.OTHERS,
        }).addAction({
            label: "Skip",
            onClick: (item, callback) => { this.handleSkipClick(item,callback) },
            type: ActionType.OTHERS,
        });

    }
    handlePresentClick(item: any) {
        this.parent.presentPSEntry(item.psEntryId)
    }

    handleSkipClick(item: any,callback?: () => any) {
        this.parent.skip(item.psEntryId,callback)
    }
}