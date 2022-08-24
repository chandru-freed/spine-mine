import FStepperMDP from "@/components/generic/FStepperMDP";
import UnderwrittingTaskIntf from "./UnderwrittingTaskIntf";
import UTApprovalStepFFormMDP from "./UTApprovalStepFFormMDP";

export default class UTFStepperMDP extends FStepperMDP {
    taskRoot: UnderwrittingTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: UnderwrittingTaskIntf }) {
        super({ myRefName: "underwrittingStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Verify",  stepContent: new UTApprovalStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }

    getMyRef() {
        console.log(this.parent.$refs);
        return this.taskRoot.$refs[this.myRefName];
    }
}