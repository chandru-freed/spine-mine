import FStepperMDP from "@/components/generic/FStepperMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";
import ECTStepFFormMDP from "./ECTStepFFormMDP";


export default class ECTFStepperMDP extends FStepperMDP {
    taskRoot: GenericTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: GenericTaskIntf }) {
        super({ myRefName: "enrollmentCompletionStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Enrollment Completion", stepContent: new ECTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }

}