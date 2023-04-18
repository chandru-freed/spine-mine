
import FTaskStepperMDP, { FTaskStepMDP } from "@/components/generic/FTaskStepperMDP";
import FUAEMTEMandateListStepMDP from "./step1/FUAEMTEMandateListStepMDP";

import FUAEMTFinalStepFFormMDP from "./step2/FUAEMTFinalStepFFormMDP";


export default class FUAEMTFStepperMDP extends FTaskStepperMDP {
    taskRoot: any;
    parent: any;
    constructor({ taskRoot }: { taskRoot: any}) {
        super({ myRefName: "followUpAmendmentEMandateStepperRef",actionable: !taskRoot.taskDisabled  });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this
        .addStep({
            name: "EMandate List",
            stepContent: new FUAEMTEMandateListStepMDP({parent: this, taskRoot: this.taskRoot})
        })
        .addStep({
            name: "Mark Complete",
            stepContent: new FUAEMTFinalStepFFormMDP({parent: this, taskRoot: this.taskRoot})
        })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
