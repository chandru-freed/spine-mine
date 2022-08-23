import FStepperMDP from "@/components/generic/FStepperMDP";
import SignServiceAgreementFailedTaskIntf from "./SignServiceAgreementFailedTaskIntf";
import SSAFFFormMDP from "./SSAFFFormMDP";

export default class SSAFFStepperMDP extends FStepperMDP {
    taskRoot: SignServiceAgreementFailedTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: SignServiceAgreementFailedTaskIntf }) {
        super({ myRefName: "signServiceAgreementFailedStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Retry Sign Agreement", stepContent: new SSAFFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }

    getMyRef() {
        console.log(this.parent.$refs);
        return this.taskRoot.$refs[this.myRefName];
    }
}
