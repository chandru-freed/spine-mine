import FStepperMDP from "@/components/generic/FStepperMDP";

import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import UUSDTFFormMDP from "./UUSDTUploadStepFFormMDP";

export default class UUSDTFStepperMDP extends FStepperMDP {
    taskRoot: SelfTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: SelfTaskIntf }) {
        super({ myRefName: "uploadUnSignedDocStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;
        this.addStep({ name: "Verify", stepContent: new UUSDTFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }

    getMyRef() {
        console.log(this.parent.$refs);
        return this.taskRoot.$refs[this.myRefName];
    }
}