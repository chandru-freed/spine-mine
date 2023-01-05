import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";

export default class POPaymentScheduleFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent, refName }: { parent: any, refName: string }) {
        super({ itemKey: "psEntryId", disabled: parent.disabledActionBtn, title: "Payment Schedule", myRefName: refName, multiSelect: true, enableExport: true });
        this.parent = parent;
        this.addColumn({
            label: "Draft Date",
            dataSelectorKey: "draftDate",
            columnCellMDP: new FCellDateMDP()
        }).addColumn({ label: "Total Amount", dataSelectorKey: "totalAmount", columnCellMDP: new FCellCurrencyMDP({ rounded: true }) })
            .addColumn({ label: "SPA Amount", dataSelectorKey: "spaAmount", columnCellMDP: new FCellCurrencyMDP({ rounded: true }) })
            .addColumn({ label: "Fee Amount", dataSelectorKey: "feeAmount", columnCellMDP: new FCellCurrencyMDP({}) })
            .addColumn({ label: "Status", dataSelectorKey: "status", columnCellMDP: new FCellStatusMDP({}) });

    }
}