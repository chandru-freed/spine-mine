import FStepperMDP from "@/components/generic/FStepperMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";
import SEMLTStepFFormMDP from "./SEMLTStepFFormMDP";

export default class SEMLTFStepperMDP extends FStepperMDP {
    taskRoot: GenericTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: GenericTaskIntf }) {
        super({ myRefName: "sendEMandateLinkStepperRef" });
        this.taskRoot = this.taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Send EMandate Link Stepper", stepContent: new SEMLTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}