import FStepperMDP from "@/components/generic/FStepperMDP";
import FlowTaskIntf from "@/section/spineapp/util/FlowTaskIntf";
import RMPTStepFFormMDP from "./RMPTStepFFormMDP";

export default class RMPTFStepperMDP extends FStepperMDP {
    taskRoot: FlowTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: FlowTaskIntf }) {
        super({ myRefName: "receiveManualPaymentStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Receive Manual Payment", stepContent: new RMPTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}