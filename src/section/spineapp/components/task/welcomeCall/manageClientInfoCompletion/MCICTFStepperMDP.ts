import FStepperMDP from "@/components/generic/FStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import MCICTCompletionStepFFormMDP from "./MCICTCompletionStepFFormMDP";

export default class MCICTFFStepperMDP extends FStepperMDP {
    taskRoot: ManualTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
        super({ myRefName: "manageClientInfoCompletionStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({name: "Complete", stepContent: new MCICTCompletionStepFFormMDP({taskRoot: taskRoot, parent: this})})
    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
