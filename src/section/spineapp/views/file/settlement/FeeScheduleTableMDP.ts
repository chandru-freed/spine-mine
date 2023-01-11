import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP"
import * as Action from "@/../src-gen/action";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";


export default class FeeScheduleTableMDP extends FDataTableMDP {

    root: any;
    constructor({ root }: { root: any }) {
        super({
            myRefName: "feeScheduleTableRef",
            dataSelectorKey: "stFeeEntryList",
            itemKey: "stEntryId"
        });
        this.root = root;

        this.addColumn({
            label: "Payment Provider",
            align: "start",
            sortable: false,
            dataSelectorKey: "paymentProvider",
        })
            .addCurrencyColumn({ label: "Fee Amount", dataSelectorKey: "feeAmount" })
            .addColumn({ label: "Settled To", dataSelectorKey: "settledTo" })

            .addColumn({ label: "DraftDate", dataSelectorKey: "draftDate", columnCellMDP: new FCellDateMDP() })
            .addColumn({ label: "status", dataSelectorKey: "status", columnCellMDP: new FCellStatusMDP({ outlined: false }) },)
            .addAction({
                label: "Present",
                onClick: (item) => this.handlePresentClick(item),
                type: ActionType.OTHERS
            })
            .addAction({
                label: "Update Account Info",

                onClick: (item) => this.handleUpdateAccountDetailsClick(item),
                type: ActionType.OTHERS
            })
            // .addAction({
            //     label: "Add STEntry",
            //     onClick: (item) => this.handleAddClick(item),
            //     type: ActionType.ADD
            // })
            .addAction({
                label: "Remove STEntry",
                onClick: (item) => this.handleDeleteClick(item),
                type: ActionType.DELETE,
                confirmation: true
            })
            ;

    }

    handlePresentClick(item: any) {
        return new Promise(resolve => {
            console.log("Hrllo")
            Action.ClientFile.PresentSTEntry.execute1(item.stEntryId, (output) => {
                Snackbar.show({
                    text: "Succesfully Deleted ST Entry",
                    pos: "bottom-center",
                });
                setTimeout(this.root.getSTPaymentPlanDetails, 1000);
                resolve(true);
                this.root.deleteSPAEntry = false;
            });
        });
    }


    handleUpdateAccountDetailsClick(item: any) {
        return new Promise(resolve => {
            console.log(item)
            this.root.handleUpdateAccountDetailsClick(item);
        });
    }

    handleAddClick(item: any) {
        return new Promise(resolve => {
            this.root.showAddForm();
            resolve(true);
        });
    }

    handleDeleteClick(item: any) {
        return new Promise(resolve => {
            Action.ClientFile.RemoveSTEntry.execute1(item.stEntryId, (output) => {
                Snackbar.show({
                    text: "Succesfully Delete ST Entry",
                    pos: "bottom-center",
                });
                resolve(true);
            });

        });
    }



}