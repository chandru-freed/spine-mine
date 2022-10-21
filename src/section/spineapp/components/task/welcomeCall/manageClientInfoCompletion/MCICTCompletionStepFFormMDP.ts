import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

export default class MCICTCompletionStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: ManualTaskIntf;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: ManualTaskIntf; parent: any }) {
        super({
            myRefName: "manualClientInfoCompletionFormRef",
            disabled: taskRoot.taskDisabled,
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        // this.addAction(
        //     new FBtnMDP({
        //         label: "Save",
        //         onClick: this.validateAndSubmit()
        //     })
        // )
        this.addAction(
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
