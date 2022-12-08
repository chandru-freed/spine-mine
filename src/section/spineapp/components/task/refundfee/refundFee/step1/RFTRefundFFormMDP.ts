
import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FEMandateSelectFieldMDP from "@/components/generic/form/field/FEMandateSelectFieldMDP";
import FNupayBankSelectFieldMDP from "@/components/generic/form/field/FNupayBankSelectFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import Task from "@/section/spineapp/util/Task";
export default class RFTRefundFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            myRefName: "rftRefundFFormRef",
            disabled: taskRoot.taskDisabled,
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this
            .
            addField(new FCurrencyFieldMDP({
                label: "Refund Amount",
                dataSelectorKey: "taskInput.feeAmount",
                parentMDP: this.childMDP,
                disabled: true,
                boundaryClass:"col-4"
            }))
            .
            addField(new FTextFieldMDP({
                label: "Account Holder Name",
                dataSelectorKey: "taskInput.accountDetails.accountHolderName",
                parentMDP: this.childMDP,
                disabled: true,
                boundaryClass:"col-4"
            }))
            .addField(
                new FTextFieldMDP({
                  parentMDP: this.childMDP,
                  dataSelectorKey: "taskInput.accountDetails.accountNumber",
                  label: "Account Number",
                  boundaryClass: "col-4",
                  disabled: true,
                })
              )
            .
            addField(new FNupayBankSelectFieldMDP({
                label: "Bank Name",
                dataSelectorKey: "taskInput.accountDetails.nupayBankMasterId",
                parentMDP: this.childMDP,
                disabled: true,
                boundaryClass:"col-4"
            }))
            .
            addField(new FTextFieldMDP({
                label: "Account Type",
                dataSelectorKey: "taskInput.accountDetails.accountType",
                parentMDP: this.childMDP,
                disabled: true,
                boundaryClass:"col-4"
            }))
            .
            addField(new FTextFieldMDP({
                label: "IFSC Code",
                dataSelectorKey: "taskInput.accountDetails.ifscCode",
                parentMDP: this.childMDP,
                disabled: true,
                boundaryClass:"col-4"
            }))
            .

            addField(new FSelectFieldMDP({
                label: "Refund status",
                dataSelectorKey: "taskOutput.refundSuccessful",
                options: RefundStatusValueList,
                parentMDP: this.childMDP,
                optionLabel: "name",
                optionValue: "value",
                mandatory: true
            }))
            .addField(new FTextFieldMDP({
                label: "TXN Ref Number",
                dataSelectorKey: "taskOutput.txnRefNumber",
                parentMDP: this.childMDP,
                condition: this.taskRoot.isRefundSuccessfull(),
                mandatory: true
            })).addField(new FTextFieldMDP({
                label: "Refund Failure Code",
                dataSelectorKey: "taskOutput.refundFailureCode",
                parentMDP: this.childMDP,
                condition: this.taskRoot.isRefundFailed(),
                mandatory: true
            })).addField(new FTextFieldMDP({
                label: "Refund Failure Reason",
                dataSelectorKey: "taskOutput.refundFailureReason",
                parentMDP: this.childMDP,
                condition: this.taskRoot.isRefundFailed()
            }))
    }

    validateAndSave() {
        return (successCallBack: any) => {
            this.getMyRef().submitForm(() => {
                Task.Action.saveTask({
                    taskId: this.taskRoot.taskId,
                    taskOutput: this.taskRoot.taskFormData.taskOutput,
                    callback: successCallBack
                });
            })
        };
    }

    getMyRef(): any {
        return this.parent.getMyRef().$refs[this.myRefName][0];
    }
}


const RefundStatusValueList = [
    { name: "SUCCESS", value: true },
    { name: "FAILED", value: false },
]