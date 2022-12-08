import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FInfoINRMDP from "@/components/generic/table/info/FInfoINRMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
export default class CreditorListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props: { parent: any }) {
        super({ myRefName: "fCreditorListFDataTableRef", title: "Creditors", enableSearch: true, itemKey: 'fiCreditorId' });
        this.parent = props.parent;
        this.addColumn({
            label: "Creditor Name",
            dataSelectorKey: "creditorName",
        })
            .addCurrencyColumn({
                label: "Creditor Balance",
                dataSelectorKey: "creditorBalance",
            }).addColumn({
                label: "Last Date Of Payment",
                dataSelectorKey: "lastDateOfPayment",
                columnCellMDP: new FCellDateMDP()
            }).addNumberColumn({
                label: "Days Delinquent",
                dataSelectorKey: "daysDelinquentAsOnOnboarding",
            }).addColumn({
                label: "Debt Type",
                dataSelectorKey: "debtType",
            }).addColumn({
                label: "Account Number",
                dataSelectorKey: "accountNumber",
            }).addColumn({
                label: "Settlement Status",
                dataSelectorKey: "settlementStatus",
                columnCellMDP: new FCellStatusMDP({})
            })
            .addAction({
                type: ActionType.OTHERS,
                onClick: item => this.handleMarkSettleClick(item),
                label: "Mark Settle",
                confirmation: true,
            })

            .addInfo({
                label: "Total Amount",
                value: this.parent.totalDebt,
                infoMDP: new FInfoINRMDP()
            }).addInfo({
                label: "WAD",
                value: this.parent.clientFileSummary.wad,
            })

    }


    handleMarkSettleClick(item: any) {
        return new Promise(resolve => {
            this.parent.settleCreditorInput.fiCreditorId =
                item.fiCreditorId;
            Action.ClientFile.SettleCreditor.execute(
                this.parent.settleCreditorInput,
                (output) => {
                    setTimeout(() => {
                        this.parent.getFiCreditorInfo();
                        this.parent.findClientFileSummary();
                    }, 500);
                    Snackbar.show({
                        text: "Succesfully Settled Creditor",
                        pos: "bottom-center",
                    });
                    resolve(true);
                },
                (err) => console.log(err)
            );
        })

    }
}