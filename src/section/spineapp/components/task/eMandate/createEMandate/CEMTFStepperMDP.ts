import FStepperMDP from "@/components/generic/FStepperMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";
import CEMTStepFFormMDP from "./CEMTStepFFormMDP";

export default class CEMTFStepperMDP extends FStepperMDP {
    taskRoot: GenericTaskIntf;
    parent: any;

    constructor({ taskRoot }: { taskRoot: GenericTaskIntf }) {
        super({ myRefName: "createEMandateStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Create EMandate", stepContent: new CEMTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}