import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import EnrollmentCompletionTaskIntf from "./EnrollmentCompletionTaskIntf";

export default class ECTStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: EnrollmentCompletionTaskIntf;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: EnrollmentCompletionTaskIntf; parent: any }) {
        super({
            myRefName: "enrollmentCompletionFormRef",
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
                disabled: true
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
}