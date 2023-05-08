
import FTaskStepperMDP, { FTaskStepMDP } from "@/components/generic/FTaskStepperMDP";

import SBCV4TFinalStepFFormMDP from "./SBCV4TFinalStepFFormMDP";


export default class SBCV4TFStepperMDP extends FTaskStepperMDP {
    taskRoot: any;
    parent: any;
    constructor({ taskRoot }: { taskRoot: any }) {
        super({ myRefName: "signedByClientStepperRef",actionable: !taskRoot.taskDisabled });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({
            name: "Mark Complete",
            stepContent: new SBCV4TFinalStepFFormMDP({parent: this, taskRoot: this.taskRoot})
        })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
