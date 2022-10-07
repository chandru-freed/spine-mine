import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
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
                mandatory: true,
                boundaryClass: "col-4",
            })
        ).addField(
            new FSelectFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "paymentProvider",
                label: "Payment Provider",
                boundaryClass: "col-4",
                mandatory: true,
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
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "remoteTxnRefNumber",
                label: "Remote Txn RefNumber",
                mandatory: true,
                boundaryClass: "col-4",
            })
        ).addField(
            new FSelectDateFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "presentedDate",
                label: "Presented Date",
                boundaryClass: "col-4",
                mandatory: true,
                futureDaysDisabled: true,
            })
        ).addField(
            new FSelectFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "status",
                label: "Payment Status",
                boundaryClass: "col-4",
                mandatory: true,
                returnObject: true,
                options: [
                    { id: "PRESENTED", name: "PRESENTED" },
                    { id: "FUND_SPLIT_REJECTED", name: "FUND SPLIT REJECTED" },
                    { id: "FUND_SPLIT_SETTLED", name: "FUND SPLIT SETTLED" },
                ],
                optionLabel: "name",
                optionValue: "id",
            })
        ).addField(
            new FCurrencyFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "totalAmount",
                label: "Total Amount",
                boundaryClass: "col-4",
                mandatory: true,
            })
        ).addField(
            new FCurrencyFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "spaAmount",
                label: "SPA Amount",
                boundaryClass: "col-4",
                mandatory: true,
            })
        ).addField(
            new FCurrencyFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "feeAmount",
                label: "Fee Amount",
                boundaryClass: "col-4",
                mandatory: true,
            })
        ).addField(
            new FCurrencyFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "msfAmount",
                label: "MSF Amount",
                boundaryClass: "col-4",
                mandatory: true,
            })
        ).addField(
            new FSelectFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "paymentMode",
                label: "Payment Mode",
                boundaryClass: "col-4",
                mandatory: true,
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
                mandatory: true,
                boundaryClass: "col-4",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "eMandateId",
                label: "eMandateId",
                mandatory: true,
                boundaryClass: "col-4",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "achSeqNumber",
                label: "Ach Seq Number",
                mandatory: true,
                boundaryClass: "col-4",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "source",
                label: "Source",
                mandatory: true,
                boundaryClass: "col-4",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "details",
                label: "Details",
                mandatory: true,
                boundaryClass: "col-4",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "receivedBy",
                label: "Received By",
                mandatory: true,
                boundaryClass: "col-4",
            })
        )
    }



    getMyRef(): any {
        return this.taskRoot.$refs[this.myRefName];
    }

}
