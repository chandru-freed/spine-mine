import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellCurrencyBtnMDP from "@/components/generic/table/cell/FCellCurrencyBtnMDP";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";
export default class DPAllPaymentFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({
            itemKey: "paymentId",
            disabled: parent.disabledActionBtn,
            title: "Payment List",
            myRefName: "poAllPaymentFDataTableRef",
            enableExport: true,
            groupBySummaryFunction: (itemList) => this.calculateTotalAmount(itemList),
            multiSelect: true
        });
        this.parent = parent;
        this.addClientFileNumberColumn({
            label: "ClientFile Number",
            dataSelectorKey: "clientFileBasicInfo.clientFileNumber",
        }).addColumn({
            label: "Mobile Number",
            dataSelectorKey: "clientBasicInfo.mobile",
            columnCellMDP: new FCellPhoneMDP(),
            hidden: true
        })
            .addStatusColumn({
                label: "Payment Type",
                dataSelectorKey: "paymentType.name",
                filterItemList: Data.Spine.PAYMENT_TYPE.list()
            })

            .addColumn({
                label: "Payment Ref Number",
                dataSelectorKey: "paymentRefNumber",
                columnCellMDP: new FCellBtnMDP({
                    color: "secondary",
                    onClick: (item) => {
                        this.parent.openPaymentDetails(item);
                    },
                }),
            })

            .addCurrencyColumn({
                label: "Total Amount",
                dataSelectorKey: "totalAmount",
            })
            .addColumn({
                label: "Account Holder Name",
                dataSelectorKey: "accountHolderName",
                // columnCellMDP: new FCellCurrencyMDP({}),
            })
            .addStatusColumn({
                label: "Payment Provider",
                dataSelectorKey: "paymentProvider.name",
                filterItemList: Data.Spine.PAYMENT_PROVIDER.list(),

            })
            .addPaymentStatusColumn({ label: "Status", dataSelectorKey: "status.name", })
            .addColumn({
                label: "Presented Date",
                dataSelectorKey: "presentedDate",
                columnCellMDP: new FCellDateMDP(),
            })
            .addColumn({
                label: "Received By",
                dataSelectorKey: "receivedBy",
            }).addAction({
                label: "Check and update",
                onClick: this.checkAndUpdate(),
                type: ActionType.OTHERS,
            }).addAction({
                label: "Request Fundsplit",
                onClick: this.handleRequestFundSplit(),
                type: ActionType.OTHERS,
            })
    }

    calculateTotalAmount(itemList: any) {
        const totalAmount = itemList.reduce((acc: number, item: any) => {
            const val = typeof (item['totalAmount']) == 'number' ? item['totalAmount'] : 0;
            acc = acc + val;
            return acc
        }, 0)
        return 'Total Amount:' + totalAmount;
    }
    handleRequestFundSplit() {
        return (paymentList: Data.Spine.FiPayment[]) => {
            return new Promise(res => {
                console.log(paymentList)
                paymentList.map((payment, index) => {
                    this.requestFundSplit(payment.paymentId);
                    if (index === paymentList.length - 1) {
                        setTimeout(this.parent.searchPaymentOperations, 1000);
                    }
                });

            })
        }
    }
    checkAndUpdate() {
        return (paymentList: Data.Spine.FiPayment[]) => {
            return new Promise(res => {
                console.log(paymentList)
                paymentList.map((payment, index) => {
                    this.checkPaymentStatus(payment.paymentId);
                    if (index === paymentList.length - 1) {
                        setTimeout(this.parent.searchPaymentOperations, 1000);
                    }
                });

            })
        }
    }
    handleClientClick(item: any) {
        this.parent.gotoClient(item.clientBasicInfo.clientId);
    }

    checkPaymentStatus(paymentId: string) {
        Action.ClientFile.CheckPaymentStatus.execute1(paymentId, (output) => {
        });
    }


  requestFundSplit(paymentId: string) {
    Action.ClientFile.RequestFundSplit.execute1(paymentId, (output) => {
      FSnackbar.success("Requested the fund split");
    });
  }

}
