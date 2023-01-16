
import * as Action from "@/../src-gen/action";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import FInfoINRMDP from "@/components/generic/table/info/FInfoINRMDP";
import * as Snackbar from "node-snackbar";
import * as Data from "@/../src-gen/data";

export default class FBPPScheduleFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent,refName }: { parent: any, refName: string }) {
        super({ itemKey: "psEntryId", disabled: parent.disabledActionBtn, title: "Payment Schedule", myRefName: refName, multiSelect: true, });
        this.parent = parent;
        this.addColumn({
            label: "Draft Date",
            dataSelectorKey: "draftDate",
            columnCellMDP: new FCellDateMDP()
        }).addColumn({ label: "Total Amount", dataSelectorKey: "totalAmount", columnCellMDP: new FCellCurrencyMDP({rounded:true }) })
            .addColumn({ label: "SPA Amount", dataSelectorKey: "spaAmount", columnCellMDP: new FCellCurrencyMDP({rounded:true}) })
            // .addColumn({ label: "Fee Amount", dataSelectorKey: "feeAmount", columnCellMDP: new FCellCurrencyMDP({}) })
            .addColumn({ label: "Status", dataSelectorKey: "status", columnCellMDP: new FCellStatusMDP({
                colorCodeData: Data.Color.PS_ENTRY_STATUS,
                outlined: true
            }) })
            .addInfo({label:"Total",value: this.parent.modelValue.taskOutput?.paymentPlan?.psEntryTotalAmount,infoMDP: new FInfoINRMDP({rounded: true})})
            .addInfo({label:"Tenure",value: this.parent.modelValue.taskOutput?.paymentPlan?.ppCalculator.tenor,})
            ;


        this
        // .addAction({
        //     label: "Present",
        //     onClick: (item) => this.handlePresentClick(item),
        //     type: ActionType.OTHERS,
        //     confirmation: true,
        //     singleSelect: true
        // }).addAction({
        //     label: "Skip",
        //     onClick: (item) => this.handleSkipClick(item),
        //     type: ActionType.OTHERS,
        //     confirmation: true,
        //     singleSelect: true
        // }).addAction({
        //     label: "Remove ",
        //     onClick: (itemList) => this.handleRemoveClick(itemList),
        //     type: ActionType.OTHERS,
        //     confirmation: true,
        // })
        .addAction({
            label: "Modify",
            onClick: (itemList) => this.handleModifyClick(itemList),
            type: ActionType.OTHERS,
        })
        
        .addAction({
            label: "Download Active Ps Plan Excel",
            onClick: (item) => this.handleDownloadActiveExcel(),
            type: ActionType.OTHERS,
            noSelect: true
        })
        .addAction({
            label: "Download Draft Ps Plan Excel",
            onClick: (item) => this.handleDownloadDraftExcel(),
            type: ActionType.OTHERS,
            noSelect: true
        })
        .addAction({
            label: "Upload Excel",
            onClick: (itemList) => this.handleUploadExcel(),
            type: ActionType.OTHERS,
            noSelect: true
        });
        // .addAction({
        //     label: "Add Entry",
        //     onClick: (item) => this.handleAddEntryClick(),
        //     type: ActionType.ADD,
        //     confirmation: true,
        //     disabled: this.disabled,
        // });

    }
    handlePresentClick(item: any): Promise<any> {
        return new Promise(resolve => {
            console.log(item)
            Action.Spine.PresentPSEntry.execute1(item.psEntryId, (output) => {
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
            Action.Spine.Skip.execute1(item.psEntryId, (output) => {
                Snackbar.show({
                    text: "Succesfully update.",
                    pos: "bottom-center",
                });
                resolve(true);
            });
        })
        // this.parent.skip(item.psEntryId,callback)
    }

    handleRemoveClick(itemList: any[]) {
        console.log(itemList);
        const psEntryIdList = itemList.map(item => item.psEntryId)
        console.log(psEntryIdList)
        return new Promise(resolve => {
            Action.ClientFile.RemovePSEntryList.execute1(psEntryIdList, output => {
                Snackbar.show({
                    text: "Succesfully Removed.",
                    pos: "bottom-center",
                });
                resolve(true);
            })
        })
    }

    handleModifyClick(itemList: any[]) {
        return new Promise(resolve => {
            this.parent.modifyAmountPSEListInput.psEntryIdList = itemList.map(item => item.psEntryId);
            this.parent.showModifyForm = true;
        });
    }
    handleDownloadActiveExcel() {
        return new Promise(res => {
            this.parent.downloadActiveExcel();
        })
    }

    handleDownloadDraftExcel() {
        return new Promise(res => {
            this.parent.downloadDraftExcel();
        })
    }

    

    handleUploadExcel() {
        return new Promise(res => {
            this.parent.handleUploadClick();
        })
    }

    
    handleAddEntryClick() {
        return new Promise(resolve => {
            this.parent.showAddPsEntryForm = true;
        });
    }
}