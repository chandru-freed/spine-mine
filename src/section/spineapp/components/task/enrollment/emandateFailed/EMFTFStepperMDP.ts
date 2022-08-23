import FStepperMDP from "@/components/generic/FStepperMDP";
import EMandateFailedTaskIntf from "./EMandateFailedTaskIntf";
import EMFTRetryStepFFormMDP from "./EMFTRetryStepFFormMDP";

export default class EMFTFStepperMDP extends FStepperMDP {
    taskRoot: EMandateFailedTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: EMandateFailedTaskIntf }) {
        super({ myRefName: " eMandateFailedStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Retry Emandate", stepContent: new EMFTRetryStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}