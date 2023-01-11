
import FTaskStepperMDP, { FTaskStepMDP } from "@/components/generic/FTaskStepperMDP";
import RFTRefundFFormMDP from "./step1/RFTRefundFFormMDP";

import RFTFinalStepFFormMDP from "./step2/RFTFinalStepFFormMDP";


export default class RFTFStepperMDP extends FTaskStepperMDP {
    taskRoot: any;
    parent: any;
    constructor({ taskRoot }: { taskRoot: any }) {
        super({ myRefName: "refundFeeStepperRef",actionable: !taskRoot.taskDisabled, linearProgress: true });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;
        const refundFeeFForm = new RFTRefundFFormMDP({parent: this, taskRoot: this.taskRoot})
        this.
        addStep({
            name: "Refund",
            stepContent: refundFeeFForm,
            submitFunc: refundFeeFForm.validateAndSave()
        }).
        addStep({
            name: "Mark Complete",
            stepContent: new RFTFinalStepFFormMDP({parent: this, taskRoot: this.taskRoot})
        })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
