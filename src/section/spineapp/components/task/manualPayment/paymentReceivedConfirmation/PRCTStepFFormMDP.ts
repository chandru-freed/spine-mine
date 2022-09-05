import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";

export default class PRCTStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: SelfTaskIntf;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: SelfTaskIntf; parent: any }) {
        super({
            myRefName: "paymentReceivedConfirmationFormRef",
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
                dataSelectorKey: "taskInput.upiLink",
                label: "Upi Link",
                mandatory: true,
                boundaryClass: "col-6",
                disabled: true
            })
        ).addField(
            new FSwitchMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.receivedSuccessful",
                label: "Received Successful",
                boundaryClass: "col-12",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.failureCode",
                label: "Failure Code",
                boundaryClass: "col-4",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.failureReason",
                label: "Failure Reason",
                boundaryClass: "col-4",
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