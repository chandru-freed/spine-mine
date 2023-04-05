
import FTaskStepperMDP, { FTaskStepMDP } from "@/components/generic/FTaskStepperMDP";
import CMSFTCDraftPaymentStepMDP from "./step1/CMSFTCDraftPaymentStepMDP";

import CMSFTCTFinalStepFFormMDP from "./step2/CMSFTCTFinalStepFFormMDP";


export default class CMSFTCTFStepperMDP extends FTaskStepperMDP {
    taskRoot: any;
    parent: any;
    constructor({ taskRoot }: { taskRoot: any}) {
        super({ myRefName: "collectMSFThroughCashfreeStepperRef",actionable: !taskRoot.taskDisabled  });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this
        .addStep({
            name: "Draft Payment",
            stepContent: new CMSFTCDraftPaymentStepMDP({parent: this, taskRoot: this.taskRoot})
        })
        // .addStep({
        //     name: "Mark Complete",
        //     stepContent: new CMSFTCTFinalStepFFormMDP({parent: this, taskRoot: this.taskRoot})
        // })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
