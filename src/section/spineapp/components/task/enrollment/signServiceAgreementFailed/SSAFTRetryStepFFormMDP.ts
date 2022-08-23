import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import SignServiceAgreementFailedTaskIntf from "./SignServiceAgreementFailedTaskIntf";

export default class SSAFTRetryStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: SignServiceAgreementFailedTaskIntf;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: SignServiceAgreementFailedTaskIntf; parent: any }) {
        super({
            myRefName: "SignServiceAgreementFailedForm",
            // dataSelectorKey: "taskOutput.clientInfo",
            disabled: taskRoot.taskDisabled,
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this.addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskInput.fileId",
                label: "File ID",
                boundaryClass: "col-6",
                disabled: true
            })
        )
        .addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskInput.digioSignStatus",
                label: "Digio Status",
                boundaryClass: "col-6",
                disabled: true
            })
        )
        .addField(
            new FSwitchMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.signAgreementRetry",
                label: "Retry Sign Agreement",
                mandatory: true,
                boundaryClass: "col-4",
            })
        ).addAction(
            new FBtnMDP({
                label: "Save",
                onClick: this.validateAndSubmit()
            })
        )
        .addAction(
            new FBtnMDP({
                label: "Mark Completed",
                onClick: this.validateAndMarkComplete(),
                btnType: BtnType.FILLED
            })
        )
    }

    getMyRef(): any {
        return this.parent.getMyRef().$refs[this.myRefName][0];
    }

    validateAndSubmit() {
        return () => {
            this.getMyRef().submitForm(this.saveTask());
        };
    }

    validateAndMarkComplete() {
        return () => {
            this.getMyRef().submitForm(this.saveAndMarkCompleteTask());
        };
    }

    saveAndMarkCompleteTask() {
        return () => {
            this.taskRoot.saveAndMarkCompleteTask();
        };
    }

    saveTask() {
        return () => {
            this.taskRoot.saveTask();
        };
    }
}