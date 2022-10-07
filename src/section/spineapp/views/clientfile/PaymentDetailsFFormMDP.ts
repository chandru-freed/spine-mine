import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class PaymentDetailsFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    constructor({ taskRoot }: { taskRoot: any; }) {
        super({
            myRefName: "paymentDetailsFFormRef",
            disabled: true,
            readonly: true
        });
        this.taskRoot = taskRoot;

        this.addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "paymentRefNumber",
                label: "Payment Ref Number",
                boundaryClass: "col-3",
            })
        ).addField(
            new FSelectFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "paymentProvider",
                label: "Payment Provider",
                boundaryClass: "col-3",
                returnObject: true,
                options: [
                    { id: "NUPAY", name: "NUPAY" },
                    { id: "ESCROWPAY", name: "ESCROWPAY" },
                    { id: "CASHFREE", name: "CASHFREE" },
                ],
                optionLabel: "name",
                optionValue: "id",
            })
        ).addField(
            new FSelectDateFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "presentedDate",
                label: "Presented Date",
                boundaryClass: "col-3",
                futureDaysDisabled: true,
            })
        ).addField(
            new FSelectFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "status",
                label: "Payment Status",
                boundaryClass: "col-3",
                returnObject: true,
                options: [
                    { id: "DRAFT", name: "DRAFT" },
                    { id: "NOT_REACHABLE", name: "NOT REACHABLE" },
                    { id: "FAILED", name: "FAILED" },
                    { id: "PRESENTED", name: "PRESENTED" },
                    { id: "RECEIVED", name: "RECEIVED" },
                    { id: "REJECTED", name: "REJECTED" },
                    { id: "FUND_SPLIT_REQUESTED", name: "FUND SPLIT REQUESTED" },
                    { id: "FUND_SPLIT_REJECTED", name: "FUND SPLIT REJECTED" },
                    { id: "SETTLED", name: "SETTLED" },
                ],
                optionLabel: "name",
                optionValue: "id",
            })
        ).addField(
            new FCurrencyFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "spaAmount",
                label: "SPA Amount",
                boundaryClass: "col-3",
            })
        ).addField(
            new FCurrencyFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "feeAmount",
                label: "Fee Amount",
                boundaryClass: "col-3",
            })
        ).addField(
            new FCurrencyFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "msfAmount",
                label: "MSF Amount",
                boundaryClass: "col-3",
            })
        ).addField(
            new FCurrencyFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "totalAmount",
                label: "Total Amount",
                boundaryClass: "col-3",
            })
        ).addField(
            new FSelectFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "paymentMode",
                label: "Payment Mode",
                boundaryClass: "col-3",
                returnObject: true,
                options: [
                    { id: "UPI", name: "UPI" },
                    { id: "NET_BANKING", name: "NET BANKING" },
                    { id: "ENACH", name: "ENACH" },
                    { id: "CREDIT_CARD", name: "CREDIT CARD" },
                    { id: "DEBIT_CARD", name: "DEBIT CARD" },
                ],
                optionLabel: "name",
                optionValue: "id",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "umrn",
                label: "Umrn",
                boundaryClass: "col-3",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "eMandateId",
                label: "eMandateId",
                boundaryClass: "col-3",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "achSeqNumber",
                label: "Ach Seq Number",
                boundaryClass: "col-3",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "source",
                label: "Source",
                boundaryClass: "col-3",
            })
        )
        .addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "details",
                label: "Details",
                boundaryClass: "col-3",
            })
        )
        .addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "receivedBy",
                label: "Received By",
                boundaryClass: "col-3",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "remoteTxnRefNumber",
                label: "Remote Txn RefNumber",
                boundaryClass: "col-3",
            })
        )
        .addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "remoteTxnRefDetails.paymentLink",
                label: "Payment Link",
                boundaryClass: "col-6",
            })
        )
    }



    getMyRef(): any {
        return this.taskRoot.$refs[this.myRefName];
    }

}
