
import FTaskStepperMDP, { FTaskStepMDP } from "@/components/generic/FTaskStepperMDP";

import AAVTFinalStepFFormMDP from "./step4/AAVTFinalStepFFormMDP";
import AATV4CreditorStepFCreditorMDP from "./step1/AATV4CreditorStepFCreditorMDP";
import AATV4PPFAPaymentPlanMDP from "./step2/AATV4PPFAPaymentPlanMDP";
import AATApproveStepFFormMDP from "./step3/AATApproveStepFFormMDP";


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
            stepContent: new AATV4CreditorStepFCreditorMDP({parent: this, taskRoot: this.taskRoot})
        })
        .addStep({
            name: "Payment Plan",
            stepContent: new AATV4PPFAPaymentPlanMDP({parent: this, taskRoot: this.taskRoot})
        })

        .addStep({
            name: "Approve Step",
            stepContent: new AATApproveStepFFormMDP({parent: this, taskRoot: this.taskRoot})
        })
        
        .addStep({
            name: "Mark Complete",
            stepContent: new AAVTFinalStepFFormMDP({parent: this, taskRoot: this.taskRoot})
        })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
