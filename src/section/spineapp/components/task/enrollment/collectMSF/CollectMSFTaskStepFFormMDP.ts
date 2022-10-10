import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class CollectMSFTaskStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            myRefName: "receiveMSFPaymentFFormRef",
            disabled: taskRoot.taskDisabled,
            readonly: true
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this.addField(
            new FCurrencyFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskInput.paymentPlan.ppCalculator.msfDraftAmount",
                label: "MSF Amount",
                boundaryClass: "col-3",
                mandatory: true,
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.firstMSFPaymentDetails.paymentRefNumber",
                label: "Payment Ref Number",
                boundaryClass: "col-3",
            })
        ).addField(
            new FSelectFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.firstMSFPaymentDetails.paymentProvider",
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
                dataSelectorKey: "taskOutput.firstMSFPaymentDetails.presentedDate",
                label: "Presented Date",
                boundaryClass: "col-3",
                futureDaysDisabled: true,
            })
        ).addField(
            new FSelectFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.firstMSFPaymentDetails.status",
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
                dataSelectorKey: "taskOutput.firstMSFPaymentDetails.spaAmount",
                label: "SPA Amount",
                boundaryClass: "col-3",
            })
        ).addField(
            new FCurrencyFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.firstMSFPaymentDetails.feeAmount",
                label: "Fee Amount",
                boundaryClass: "col-3",
            })
        ).addField(
            new FCurrencyFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.firstMSFPaymentDetails.msfAmount",
                label: "MSF Amount",
                boundaryClass: "col-3",
            })
        ).addField(
            new FSelectFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.firstMSFPaymentDetails.paymentMode",
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
                dataSelectorKey: "taskOutput.firstMSFPaymentDetails.umrn",
                label: "Umrn",
                boundaryClass: "col-3",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.firstMSFPaymentDetails.eMandateId",
                label: "eMandateId",
                boundaryClass: "col-3",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.firstMSFPaymentDetails.achSeqNumber",
                label: "Ach Seq Number",
                boundaryClass: "col-3",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.firstMSFPaymentDetails.source",
                label: "Source",
                boundaryClass: "col-3",
            })
        )
            .addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "taskOutput.firstMSFPaymentDetails.details",
                    label: "Details",
                    boundaryClass: "col-3",
                })
            )
            .addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "taskOutput.firstMSFPaymentDetails.receivedBy",
                    label: "Received By",
                    boundaryClass: "col-3",
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "taskOutput.firstMSFPaymentDetails.remoteTxnRefNumber",
                    label: "Remote Txn Ref Number",
                    boundaryClass: "col-3",
                })
            )
            .addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "taskOutput.firstMSFPaymentDetails.remoteTxnRefDetails.paymentLink",
                    label: "Remote Payment Link",
                    boundaryClass: "col-6",
                })
            )
            .addAction(
                new FBtnMDP({
                    label: "Receive MSF Payment",
                    onClick: this.receiveMSFPayment(),
                })
            ).addAction(
                new FBtnMDP({
                    label: "Check Payment Status",
                    onClick: this.checkPaymentStatus(),
                })
            ).addAction(
                new FBtnMDP({
                    label: "Mark Complete",
                    onClick: this.saveAndMarkCompleteTask(),
                    btnType: BtnType.FILLED,
                })
            );
    }

    getMyRef(): any {
        return this.parent.getMyRef().$refs[this.myRefName][0];
    }

    receiveMSFPayment() {
        return () => {
            this.taskRoot.receiveMSFPayment();
        };
    }

    checkPaymentStatus() {
        return () => {
            this.taskRoot.checkPaymentStatus();
        };
    }

    saveAndMarkCompleteTask() {
        return () => {
            this.taskRoot.saveAndMarkCompleteTask();
        };
    }

}
