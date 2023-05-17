import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";

import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";

export default class PaymentDetailsFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ myRefName: "PaymentDetailsRef", readonly: true });
        this.parent = parent;
        this
            .addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "paymentRefNumber",
                    label: "Payment Ref Number",
                    boundaryClass: "col-3",
                    condition: !!this.parent.selectedPaymentSummaryToView.paymentRefNumber
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "clientFileNumber",
                    label: "Client File Number",
                    boundaryClass: "col-3"
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "paymentType.name",
                    label: "Payment Type",
                    boundaryClass: "col-3",
                    condition: !!this.parent.selectedPaymentSummaryToView.paymentType
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "paymentProvider.name",
                    label: "Payment Provider",
                    boundaryClass: "col-3",
                    condition: !!this.parent.selectedPaymentSummaryToView.paymentProvider
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "paymentMode.name",
                    label: "Payment Mode",
                    boundaryClass: "col-3",
                    condition: !!this.parent.selectedPaymentSummaryToView.paymentMode
                })
            )
            .addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "accountNumber",
                    label: "Account Number",
                    boundaryClass: "col-3",
                    condition: !!this.parent.selectedPaymentSummaryToView.accountNumber
                })
            )
            .addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "ifscCode",
                    label: "Ifsc Code",
                    boundaryClass: "col-3",
                    condition: !!this.parent.selectedPaymentSummaryToView.ifscCode
                })
            ).addField(
                new FCurrencyFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "totalAmount",
                    label: "Total Amount",
                    boundaryClass: "col-3",
                    condition: !!this.parent.selectedPaymentSummaryToView.totalAmount
                })
            ).addField(
                new FCurrencyFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "spaAmount",
                    label: "Spa Amount",
                    boundaryClass: "col-3",
                    condition: !!this.parent.selectedPaymentSummaryToView.spaAmount
                })
            ).addField(
                new FCurrencyFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "feeAmount",
                    label: "Fee Amount",
                    boundaryClass: "col-3",
                    condition: !!this.parent.selectedPaymentSummaryToView.feeAmount
                })
            ).addField(
                new FCurrencyFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "msfAmount",
                    label: "Msf Amount",
                    boundaryClass: "col-3",
                    condition: !!this.parent.selectedPaymentSummaryToView.msfAmount
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "remoteTxnRefNumber",
                    label: "Remote Txn Ref Number",
                    boundaryClass: "col-3",
                    condition: !!this.parent.selectedPaymentSummaryToView.remoteTxnRefNumber
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "status.name",
                    label: "Status",
                    boundaryClass: "col-3",
                    condition: !!this.parent.selectedPaymentSummaryToView.status
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "receivedBy",
                    label: "Received By",
                    boundaryClass: "col-3",
                    condition: !!this.parent.selectedPaymentSummaryToView.receivedBy
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "selfEnrolPaymentLink",
                    label: "Self Enrol Payment Link",
                    boundaryClass: "col-3",
                    condition: !!this.parent.selectedPaymentSummaryToView.selfEnrolPaymentLink
                })
            )
            .addAction(new FBtnMDP({
                label: "Cancel",
                onClick: () => { this.parent.resetPaymentForm() },
                btnType: BtnType.TEXT
            }))
            .addAction(new FBtnMDP({
                label: "Check Payment Status",
                onClick: () => {
                    this.checkPaymentStatus();
                },
                condition: this.parent.selectedPaymentSummaryToView.status.id === 'PRESENTED'
            }))
            .addAction(new FBtnMDP({
                label: "Check Split Status",
                onClick: () => {
                    this.updateFundSplitStatus();
                },
                condition: this.parent.selectedPaymentSummaryToView.status.id === 'FUND_SPLIT_REQUESTED'
            }))

            .addAction(new FBtnMDP({
                label: "Request Split",
                onClick: () => {
                    this.updateFundSplitStatus();
                },
                condition: this.parent.selectedPaymentSummaryToView.status.id === 'RECEIVED'&&
                this.parent.selectedPaymentSummaryToView.paymentMode.id === 'ENACH'
            }))

            
    }

    checkPaymentStatus() {
        console.log(this.parent.selectedPaymentSummaryToView)
        Action.ClientFile.CheckPaymentStatus.execute1(this.parent.selectedPaymentSummaryToView.paymentId, (output) => {
            FSnackbar.success("Check payment status is clicked")

        });
    }

    updateFundSplitStatus() {
        Action.ClientFile.UpdateFundSplitStatus.execute1(
            this.parent.selectedPaymentSummaryToView.paymentId,
            (output) => {
                FSnackbar.success("Check fund split status is clicked");
            }
        );
    }

    requestFundSplit() {
        Action.ClientFile.RequestFundSplit.execute1(this.parent.selectedPaymentSummaryToView.paymentId,
            (output) => {
                FSnackbar.success("Requested the fund split");
            });
    }
}
