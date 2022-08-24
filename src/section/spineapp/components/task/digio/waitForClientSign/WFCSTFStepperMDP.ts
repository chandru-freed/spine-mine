import FStepperMDP from "@/components/generic/FStepperMDP";
import WaitForClientSignTaskIntf from "./WaitForClientSignTaskIntf";
import WFCSTStepFFormMDP from "./WFCSTStepFFormMDP";

export default class WFCSTFStepperMDP extends FStepperMDP {
    taskRoot: WaitForClientSignTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: WaitForClientSignTaskIntf }) {
        super({ myRefName: "waitForClientSignStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;
        this.addStep({ name: "Wait For Client Sign", stepContent: new WFCSTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}