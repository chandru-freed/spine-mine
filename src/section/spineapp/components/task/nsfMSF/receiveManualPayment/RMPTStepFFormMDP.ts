import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FlowTaskIntf from "@/section/spineapp/util/FlowTaskIntf";

export default class RMPTStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: FlowTaskIntf;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: FlowTaskIntf; parent: any }) {
        super({
            myRefName: "receiveManualPaymentFormRef",
            disabled: taskRoot.taskDisabled,
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this.addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskInput.fileId",
                label: "File Id",
                mandatory: true,
                boundaryClass: "col-6",
                disabled: true
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskInput.amountToBeReceived",
                label: "Amount To Be Received",
                mandatory: true,
                boundaryClass: "col-6",
                disabled: true
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskInput.upiId",
                label: "UPI Id",
                mandatory: true,
                boundaryClass: "col-6",
                disabled: true
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskInput.intent",
                label: "Intent",
                mandatory: true,
                boundaryClass: "col-6",
                disabled: true
            })
        ).addField(
            new FSwitchMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.paymentSuccessfull",
                label: "Payment Successfull",
                mandatory: true,
                disabled:true
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.failureCode",
                label: "Failure Code",
                mandatory: true,
                boundaryClass: "col-6",
                disabled: true,
                condition: !this.taskRoot.taskFormData.taskOutput.paymentSuccessfull
            })
        ).addField(
            new FTextareaMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.failureReason",
                label: "Failure Reason",
                mandatory: true,
                boundaryClass: "col-6",
                disabled: true,
                condition: !this.taskRoot.taskFormData.taskOutput.paymentSuccessfull
            })
        ).addAction(
            new FBtnMDP({
              label: "Rescue",
              onClick: this.validateAndSubmit(),
            })
          );
    }
    getMyRef(): any {
        return this.parent.getMyRef().$refs[this.myRefName][0];
    }

    validateAndSubmit() {
        return () => {
            this.getMyRef().submitForm(this.rescueTask());
        };
    }

    rescueTask() {
        return () => {
            this.taskRoot.rescueTask();
        };
    }
}