import FStepperMDP from "@/components/generic/FStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

import CSETStepFFormMDP from './CSETStepFFormMDP'

export default class CSETFStepperMDP extends FStepperMDP {
    taskRoot: ManualTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
        super({ myRefName: "clientSignExpiredStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Client Sign Expired", stepContent: new CSETStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}