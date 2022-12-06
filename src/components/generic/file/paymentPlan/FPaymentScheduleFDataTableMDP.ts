import FCellDateMDP from "../../table/cell/FCellDateMDP";
import FCellCurrencyMDP from "../../table/cell/FCellCurrencyMDP";
import FCellStatusMDP from "../../table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "../../table/FDataTableMDP";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";

export default class FPaymentScheduleFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ itemKey: "psEntryId", disabled: parent.disabledActionBtn, title: "Payment Schedule",myRefName:"fPaymentScheduleFDataTableMDP", multiSelect: true });
        this.parent = parent;
        this.addColumn({
            label: "Draft Date",
            dataSelectorKey: "draftDate",
            columnCellMDP: new FCellDateMDP()
        }).addColumn({ label: "Total Amount", dataSelectorKey: "totalAmount", columnCellMDP: new FCellCurrencyMDP({rounded:true }) })
            .addColumn({ label: "Settlement Amount", dataSelectorKey: "settlementReserve", columnCellMDP: new FCellCurrencyMDP({rounded:true}) })
            .addColumn({ label: "Fee Amount", dataSelectorKey: "feeAmount", columnCellMDP: new FCellCurrencyMDP({}) })
            .addColumn({ label: "Status", dataSelectorKey: "status", columnCellMDP: new FCellStatusMDP() });


        this.addAction({
            label: "Present",
            onClick: (item) => this.handlePresentClick(item) ,
            type: ActionType.OTHERS,
            confirmation: true
        }).addAction({
            label: "Skip",
            onClick: (item) =>  this.handleSkipClick(item) ,
            type: ActionType.OTHERS,
            confirmation: true,
            singleSelect: true
        }).addAction({
            label: "Add Entry",
            onClick: (item) =>  this.handleAddEntryClick() ,
            type: ActionType.ADD,
            confirmation: true,
            disabled:this.disabled,

        });

    }
    handlePresentClick(item: any): Promise<any> {
        return new Promise(resolve => {
            console.log(item)
            Action.Spine.PresentPSEntry.execute1(item[0].psEntryId, (output) => {
                Snackbar.show({
                  text: "Succesfully update.",
                  pos: "bottom-center",
                });
                resolve(true);
              });
        });
    }

    handleSkipClick(item: any,): Promise<any> {
        return new Promise(resolve => {
            Action.Spine.Skip.execute1(item[0].psEntryId, (output) => {
                Snackbar.show({
                  text: "Succesfully update.",
                  pos: "bottom-center",
                });
                resolve(true);
              });
        })
        // this.parent.skip(item.psEntryId,callback)
    }

    handleAddEntryClick() {
        return new Promise(resolve => {
            this.parent.showAddPsEntryForm = true;
        });
    }
}