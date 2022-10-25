import FStepperMDP from "@/components/generic/FStepperMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";

import DUSDTStepFFormMDP from "./DUSDTStepFFormMDP";

export default class DUSDTFStepperMDP extends FStepperMDP {
    taskRoot: SelfTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: SelfTaskIntf }) {
        super({ myRefName: "downloadUnSignedDocStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;
        this.addStep({ name: "Download UnSigned Doc", stepContent: new DUSDTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}