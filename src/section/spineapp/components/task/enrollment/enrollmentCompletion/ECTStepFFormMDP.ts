import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";


export default class ECTStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: ManualTaskIntf;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: ManualTaskIntf; parent: any }) {
        super({
            myRefName: "enrollmentCompletionFormRef",
            disabled: taskRoot.taskDisabled,
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this.addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskInput.clientFileId",
                label: "File Number",
                mandatory: true,
                disabled: true
            })
        ).addAction(
            new FBtnMDP({
                label: "Mark Complete",
                onClick: this.validateAndMarkComplete(),
                btnType: BtnType.FILLED,
                condition: this.isStarted()
            })
        ).addAction(
            new FBtnMDP({
                label: "Rescue",
                onClick: this.rescueTask(),
                condition: this.isException()
            })
        );
    }
    getMyRef(): any {
        return this.parent.getMyRef().$refs[this.myRefName][0];
    }


    validateAndMarkComplete() {
        return () => {
            this.getMyRef().submitForm(this.saveAndMarkCompleteTask());
        };
    }

    rescueTask() {
        return () => {
            this.taskRoot.rescueTask();
        };
    }

    isStarted() {
        return this.taskRoot.taskDetails.taskState === "STARTED" || this.taskRoot.taskDetails.taskState === "PARTIALLY_COMPLETED";
    }

    isException() {
        return this.taskRoot.taskDetails.taskState === "EXCEPTION_Q" || this.taskRoot.taskDetails.taskState === "EXIT_Q";
    }

    saveAndMarkCompleteTask() {
        return () => {
            this.taskRoot.saveAndMarkCompleteTask();
        };
    }
}