import FStepperMDP from "@/components/generic/FStepperMDP";

import DeferredTaskIntf from "@/section/spineapp/util/task_intf/DeferredTaskIntf";

import WFCSTStepFFormMDP from "./WFCSTStepFFormMDP";

export default class WFCSTFStepperMDP extends FStepperMDP {
    taskRoot: DeferredTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: DeferredTaskIntf }) {
        super({ myRefName: "waitForClientSignStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;
        this.addStep({ name: "Wait For Client Sign", stepContent: new WFCSTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}