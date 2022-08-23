import FStepperMDP from "@/components/generic/FStepperMDP";
import ECTStepFFormMDP from "./ECTStepFFormMDP";
import EnrollmentCompletionTaskIntf from "./EnrollmentCompletionTaskIntf";

export default class ECTFStepperMDP extends FStepperMDP {
    taskRoot: EnrollmentCompletionTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: EnrollmentCompletionTaskIntf }) {
        super({ myRefName: "enrollmentCompletionStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Enrollment Completion", stepContent: new ECTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }

}