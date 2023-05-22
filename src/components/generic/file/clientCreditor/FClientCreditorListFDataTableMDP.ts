import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import FInfoINRMDP from "../../table/info/FInfoINRMDP";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
export default class FClientCreditorListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ title: "Excluded Creditors", myRefName: "FClientCreditorListRef", itemKey:"clCreditorId", disabled: parent.disabled });
        this.parent = parent;
        this
            .addColumn({
                label: "Creditor Name",
                dataSelectorKey: "creditorName"
            }).addCurrencyColumn({
                label: "Creditor Balance",
                dataSelectorKey: "creditorBalance"
            }).addCurrencyColumn({
                label: "EMI Amount",
                dataSelectorKey: "emiAmount"
            }).addDateColumn({
                label: "Last Date Of Payment",
                dataSelectorKey: "lastDateOfPayment"
            }).addStatusColumn({
                label: "Debt Type",
                dataSelectorKey: "debtType"
            }).addColumn({
                label: "Account Number",
                dataSelectorKey: "accountNumber"
            }).addColumn({
                label: "Details",
                dataSelectorKey: "details"
            })
            .addAction({
                label: "Include to program",
                onClick: this.handleIncludeClick(),
                type: ActionType.OTHERS
            })
            .addInfo({
                label: "Total Amount",
                value:this.parent.totalCreditorBalance,
                infoMDP: new FInfoINRMDP({})
            })
            // .addAction({
            //     label: "remove",
            //     onClick: this.handleDeleteClientCreditor(),
            //     type: ActionType.DELETE,
            //     confirmation: true,
            //     disabled: false
            // })
            .addAction({
                label: "Edit",
                onClick: this.handleEditClick(),
                type: ActionType.EDIT,
                confirmation: true,
                disabled: false
            })
    }

    handleDeleteClientCreditor() {
        return (item: Data.ClientFile.ClCreditor) => {
            return new Promise(res => {
                // console.log(item)
                // const input:Data.ClientFile.RemoveClCreditorInput = new Data.ClientFile.RemoveClCreditorInput();
                // input.clCreditorId = item.clCreditorId;
                // Action.ClientFile.RemoveClCreditor.execute(input, output => {
                //     res(true);
                // })
            })
        }
    }
    handleEditClick() {
        return (item: Data.ClientFile.ClCreditor) => {
            return new Promise(res => {
                this.parent.handleEditClick(item)
            })
        }
    }

    handleIncludeClick() {
        return (item: any) => {
            return new Promise(resolve => {
                this.parent.handleIncludeCreditor(item);
                resolve(true);
            })
        }

    }
}
