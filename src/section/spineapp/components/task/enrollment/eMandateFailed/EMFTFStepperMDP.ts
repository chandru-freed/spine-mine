import FStepperMDP from "@/components/generic/FStepperMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";

import EMFTRetryStepFFormMDP from "./EMFTRetryStepFFormMDP";

export default class EMFTFStepperMDP extends FStepperMDP {
    taskRoot: GenericTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: GenericTaskIntf }) {
        super({ myRefName: " eMandateFailedStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Retry Emandate", stepContent: new EMFTRetryStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}