import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";


export default class EMFTRetryStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: GenericTaskIntf;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: GenericTaskIntf; parent: any }) {
        super({
            myRefName: "eMandateFailedFormRef",
            disabled: taskRoot.taskDisabled,
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this.addField(new FTextFieldMDP({
            parentMDP: this.childMDP,
            dataSelectorKey: "taskInput.fileId",
            label: "File Id",
            disabled: true,
            boundaryClass: "col-6"
        }))
        .addField(new FTextFieldMDP({
            parentMDP: this.childMDP,
            dataSelectorKey: "taskInput.eMandateStatus",
            label: "Emandate Status",
            disabled: true,
            boundaryClass: "col-6"
        }))
        .addField(
            new FSwitchMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.eMandateRetry",
                label: "Retry Emandate",
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