
import FTaskStepperMDP, { FTaskStepMDP } from "@/components/generic/FTaskStepperMDP";
import RSPATRefundFFormMDP from "./step1/RSPATRefundFFormMDP";

import RSPATFinalStepFFormMDP from "./step2/RSPATFinalStepFFormMDP";


export default class RFTFStepperMDP extends FTaskStepperMDP {
    taskRoot: any;
    parent: any;
    constructor({ taskRoot }: { taskRoot: any }) {
        super({ myRefName: "refundFeeStepperRef",actionable: !taskRoot.taskDisabled, linearProgress: true });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;
        const refundFeeFForm = new RSPATRefundFFormMDP({parent: this, taskRoot: this.taskRoot})
        this.
        addStep({
            name: "Refund",
            stepContent: refundFeeFForm,
            submitFunc: refundFeeFForm.validateAndSave(),
            rescueFunc: refundFeeFForm.validateAndRescue(),
        }).
        addStep({
            name: "Mark Complete",
            stepContent: new RSPATFinalStepFFormMDP({parent: this, taskRoot: this.taskRoot})
        })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
