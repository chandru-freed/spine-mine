
import FTaskStepperMDP, { FTaskStepMDP } from "@/components/generic/FTaskStepperMDP";

import CCTFinalStepFFormMDP from "./CCTFinalStepFFormMDP";


export default class CCTFStepperMDP extends FTaskStepperMDP {
    taskRoot: any;
    parent: any;
    constructor({ taskRoot }: { taskRoot: any}) {
        super({ myRefName: "cancellationChecklistStepperRef",actionable: !taskRoot.taskDisabled  });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({
            name: "Mark Complete",
            stepContent: new CCTFinalStepFFormMDP({parent: this, taskRoot: this.taskRoot}),
            submitFunc: this.taskRoot.saveTask
        })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
