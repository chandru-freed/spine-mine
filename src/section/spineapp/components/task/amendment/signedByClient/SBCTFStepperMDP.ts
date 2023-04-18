
import FTaskStepperMDP, { FTaskStepMDP } from "@/components/generic/FTaskStepperMDP";

import sBCTFinalStepFFormMDP from "./SBCTFinalStepFFormMDP";


export default class SBCTFStepperMDP extends FTaskStepperMDP {
    taskRoot: any;
    parent: any;
    constructor({ taskRoot }: { taskRoot: any }) {
        super({ myRefName: "signedByClientStepperRef",actionable: !taskRoot.taskDisabled });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({
            name: "Mark Complete",
            stepContent: new sBCTFinalStepFFormMDP({parent: this, taskRoot: this.taskRoot})
        })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
