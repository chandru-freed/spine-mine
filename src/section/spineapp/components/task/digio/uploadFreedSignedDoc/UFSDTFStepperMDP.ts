import FStepperMDP from "@/components/generic/FStepperMDP";

import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import UFSDTStepFFormMDP from "./UFSDTStepFFormMDP";


export default class UFSDTFStepperMDP extends FStepperMDP {
    taskRoot: SelfTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: SelfTaskIntf }) {
        super({ myRefName: "uploadFreedSignedDocStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Upload Freed Signed Doc", stepContent: new UFSDTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }
    getMyRef() {
        console.log(this.parent.$refs);
        return this.taskRoot.$refs[this.myRefName];
    }
}