import FStepperMDP from "@/components/generic/FStepperMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import CEMTStepFFormMDP from "./CEMTStepFFormMDP";

export default class CEMTFStepperMDP extends FStepperMDP {
    taskRoot: SelfTaskIntf;
    parent: any;

    constructor({ taskRoot }: { taskRoot: SelfTaskIntf }) {
        super({ myRefName: "createEMandateStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Create EMandate", stepContent: new CEMTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}