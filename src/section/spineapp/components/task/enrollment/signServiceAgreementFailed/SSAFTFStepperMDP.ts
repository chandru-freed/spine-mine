import FStepperMDP from "@/components/generic/FStepperMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";

import SSAFTRetryStepFFormMDP from "./SSAFTRetryStepFFormMDP";

export default class SSAFTFStepperMDP extends FStepperMDP {
    taskRoot: GenericTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: GenericTaskIntf }) {
        super({ myRefName: "signServiceAgreementFailedStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Retry Sign Agreement", stepContent: new SSAFTRetryStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }

    getMyRef() {
        console.log(this.parent.$refs);
        return this.taskRoot.$refs[this.myRefName];
    }
}
