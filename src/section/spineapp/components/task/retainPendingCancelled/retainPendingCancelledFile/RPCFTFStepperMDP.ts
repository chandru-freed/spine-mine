
import FTaskStepperMDP, { FTaskStepMDP } from "@/components/generic/FTaskStepperMDP";

import RPCFTFinalStepFFormMDP from "./RPCFTFinalStepFFormMDP";


export default class RPCFTFStepperMDP extends FTaskStepperMDP {
    taskRoot: any;
    parent: any;
    constructor({ taskRoot }: { taskRoot: any}) {
        super({ myRefName: "retainPendingCancelledFileStepperRef",actionable: !taskRoot.taskDisabled  });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({
            name: "Mark Complete",
            stepContent: new RPCFTFinalStepFFormMDP({parent: this, taskRoot: this.taskRoot})
        })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
