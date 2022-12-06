
import FTaskStepperMDP, { FTaskStepMDP } from "@/components/generic/FTaskStepperMDP";

import PATFinalStepFFormMDP from "./PATFinalStepFFormMDP";


export default class PATFStepperMDP extends FTaskStepperMDP {
    taskRoot: any;
    parent: any;
    constructor({ taskRoot }: { taskRoot: any }) {
        super({ myRefName: "prepareAmendmentStepperRef",actionable: !taskRoot.taskDisabled });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({
            name: "Mark Complete",
            stepContent: new PATFinalStepFFormMDP({parent: this, taskRoot: this.taskRoot})
        })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
