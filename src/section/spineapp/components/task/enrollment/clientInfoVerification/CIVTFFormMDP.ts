import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import ClientInfoVerificationTaskIntf from "./ClientInfoVerificationTaskIntf";


export default class CIVTFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: ClientInfoVerificationTaskIntf;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: ClientInfoVerificationTaskIntf; parent: any }) {
        super({
            myRefName: "clientInfoVerificationForm",
            // dataSelectorKey: "taskOutput.clientInfo",
            disabled: taskRoot.taskDisabled,
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this.addField(new FTextFieldMDP({
            parentMDP: this.childMDP,
            dataSelectorKey: "taskInput.fileId",
            label: "File Id",
            disabled: true
        }))
        .addField(
            new FSwitchMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.verified",
                label: "Verified",
            })
        ).addAction(
            new FBtnMDP({
                label: "Save",
                onClick: this.validateAndSubmit(),
            })
        ).addAction(
            new FBtnMDP({
                label: "Mark Complete",
                onClick: this.validateAndMarkComplete(),
                btnType: BtnType.FILLED
            })
        );
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