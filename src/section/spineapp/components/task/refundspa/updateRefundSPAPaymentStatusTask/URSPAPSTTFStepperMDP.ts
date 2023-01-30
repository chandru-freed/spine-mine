
import FTaskStepperMDP, { FTaskStepMDP } from "@/components/generic/FTaskStepperMDP";
import URSPAPSTFPaymentDetailsMDP from "./step1/URSPAPSTFPaymentDetailsMDP";

import URSPAPSTTFinalStepFFormMDP from "./step2/URSPAPSTTFinalStepFFormMDP";


export default class URSPAPSTTFStepperMDP extends FTaskStepperMDP {
    taskRoot: any;
    parent: any;
    constructor({ taskRoot }: { taskRoot: any }) {
        super({ myRefName: "updateRefundSPAPaymentStatusTaskStepperRef",actionable: !taskRoot.taskDisabled });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({
            name: "Payment Details",
            stepContent: new URSPAPSTFPaymentDetailsMDP({paymentId: this.taskRoot.getPaymentId()}),
        }).addStep({
            name: "Mark Complete",
            stepContent: new URSPAPSTTFinalStepFFormMDP({parent: this, taskRoot: this.taskRoot})
        })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
