
import FTaskStepperMDP, { FTaskStepMDP } from "@/components/generic/FTaskStepperMDP";

import PAVTFinalStepFFormMDP from "./step3/PAVTFinalStepFFormMDP";
import PATV4CreditorStepFCreditorMDP from "./step1/PATV4CreditorStepFCreditorMDP";
import PATV4PPFAPaymentPlanMDP from "./step2/PATV4PPFAPaymentPlanMDP";


export default class PAVTFStepperMDP extends FTaskStepperMDP {
    taskRoot: any;
    parent: any;
    constructor({ taskRoot }: { taskRoot: any}) {
        super({ myRefName: "prepareAmendmentV4StepperRef",actionable: !taskRoot.taskDisabled  });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this
        .addStep({
            name: "Creditor",
            stepContent: new PATV4CreditorStepFCreditorMDP({parent: this, taskRoot: this.taskRoot})
        })
        .addStep({
            name: "Payment Plan",
            stepContent: new PATV4PPFAPaymentPlanMDP({parent: this, taskRoot: this.taskRoot})
        })
        
        .addStep({
            name: "Mark Complete",
            stepContent: new PAVTFinalStepFFormMDP({parent: this, taskRoot: this.taskRoot})
        })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
