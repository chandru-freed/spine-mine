import FStepperMDP from "@/components/generic/FStepperMDP";

import DeferredTaskIntf from "@/section/spineapp/util/task_intf/DeferredTaskIntf";
import WFEMTStepFFormMDP from "./WFEMTStepFFormMDP";

export default class WFEMTFStepperMDP extends FStepperMDP {
    taskRoot: DeferredTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: DeferredTaskIntf }) {
        super({ myRefName: "waitForEMandateStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;
        this.addStep({ name: "Wait For Emandate", stepContent: new WFEMTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}