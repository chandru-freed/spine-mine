
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellBooleanMDP from "@/components/generic/table/cell/FCellBooleanMDP";
import FSnackbar from "@/fsnackbar";
import FCellCopyMDP from "@/components/generic/table/cell/FCellCopyMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";

export default class CFEMandateListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props: { parent: any, taskRoot?: any }) {
        super({ myRefName: "CFEMandateListFDataTableRef", title: "EMandate List", disabled: props.taskRoot?.taskStateTerminated, enableShowHideColumns: true, itemKey: "eMandateId" });
        this.parent = props.parent;
        this.addColumn({
            label: "Nupay Cust Id",
            dataSelectorKey: "remoteEMandateId",
            columnCellMDP: new FCellCopyMDP({
                dataSelectorKeyToCopy: "redirectUrl",
                tooltipText: "Click here to copy the EMandate link"
            })
        }).addColumn({
            label: "IFSC Code",
            dataSelectorKey: "ifscCode",
        })
            .addCurrencyColumn({
                dataSelectorKey: "amount",
                label: "Amount"
            })
            .addEMandateStatusColumn({ label: "Status", dataSelectorKey: "status.name", })
            .addPaymentProviderColumn({
                label: "Provider",
                dataSelectorKey: "provider.name",
                hidden: true
            }).addNumberColumn({
                label: "Account Number",
                dataSelectorKey: "accountNumber",

            }).addColumn({
                label: "Created On",
                dataSelectorKey: "createdOn",
                columnCellMDP: new FCellDateTimeMDP(),
                sortable: true
            })
            .addBooleanColumn({
                label: "Default",
                dataSelectorKey: "isDefault",
            })


            .addAction({
                label: "Initiate EMandate",
                onClick: this.handleInitiateClick(),
                type: ActionType.ADD
            }).addAction({
                label: "Refresh",
                onClick: this.handleRefreshClick(),
                type: ActionType.REFRESH,
                noSelect: true
            }).addAction({
                label: "Info",
                onClick: this.handleInfoClick(),
                type: ActionType.INFO,
                noSelect: true
            }).addAction({
                label: "Resend Mail",
                onClick: this.handleResendClick(),
                type: ActionType.OTHERS,
                confirmation: true
            })
            .addAction({
                label: "Mark Default",
                onClick: this.handleMarkDefaultClick(),
                type: ActionType.OTHERS,
                confirmation: true,
                singleSelect: true
            })
            .addAction({
                label: "Record EMandate",
                onClick: this.handleRecordEMandateClick(),
                type: ActionType.OTHERS,
                noSelect: true
            })
    }

    handleInitiateClick() {
        return () => {
            return new Promise(res => {
                this.parent.prepopulateDetails();
                this.parent.showViewEMandateForm = false;
                this.parent.showInitiateForm = true;
                res(true)
            })
        }
    }
    handleRefreshClick() {
        return () => {
            return new Promise(res => {
                Action.ClientFile.GetAllEMandateList.execute1(this.parent.clientFileId, output => {

                });
                this.parent.getClientFileBasicInfo();
                // this.parent.getTaskListForClientFile();
            }
            )
        }
    }
    handleInfoClick() {
        return (item: any) => {
            return new Promise(res => {
                this.parent.handleInfoClick(item)
            })
        }
    }
    handleRecordEMandateClick() {
        return (item: any) => {
            return new Promise(res => {
                this.parent.openRecordEMandatePage()
            })
        }
    }
    handleResendClick() {
        return (item: any) => {
            return new Promise(res => {
                const input: Data.ClientFile.SendEmandateInput = new Data.ClientFile.SendEmandateInput();
                input.fiEMandateId = item.eMandateId;
                input.byEmail = true;
                input.bySMS = false;
                input.byWhatsapp = false;
                Action.ClientFile.SendEmandate.execute(input, output => {
                    FSnackbar.success("Succesfully resend the agreement")
                    res(true);
                });
            })
        }
    }
    handleMarkDefaultClick() {
        return (item: any) => {
            return new Promise(res => {
                this.parent.markDefault(item.eMandateId);
                res(true);
            })
        }
    }
}