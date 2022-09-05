import FStepperMDP from "@/components/generic/FStepperMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import SLTSendStepFFormMDP from "./SLTSendStepFFormMDP";

export default class SLTFStepperMDP extends FStepperMDP {
    taskRoot: SelfTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: SelfTaskIntf }) {
        super({ myRefName: "sendLinkStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Send Link", stepContent: new SLTSendStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }
    getMyRef() {
        console.log(this.parent.$refs);
        return this.taskRoot.$refs[this.myRefName];
    }
}