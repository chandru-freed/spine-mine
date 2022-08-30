import FStepperMDP from "@/components/generic/FStepperMDP";
import FlowTaskIntf from "@/section/spineapp/util/FlowTaskIntf";
import SSATDigioSignStatusStepFFormMDP from "./SSATStepFFormMDP";


export default class SSATFStepperMDP extends FStepperMDP {
    taskRoot: FlowTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: FlowTaskIntf }) {
        super({ myRefName: "sSATFStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Sign Service Agreement", stepContent: new SSATDigioSignStatusStepFFormMDP({ taskRoot: taskRoot, parent: this }) })

    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}