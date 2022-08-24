import FStepperMDP from "@/components/generic/FStepperMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";

import DUSDTStepFFormMDP from "./DUSDTStepFFormMDP";

export default class DUSDTFStepperMDP extends FStepperMDP {
    taskRoot: GenericTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: GenericTaskIntf }) {
        super({ myRefName: "downloadUnSignedDocStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;
        this.addStep({ name: "Download UnSigned Doc", stepContent: new DUSDTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}