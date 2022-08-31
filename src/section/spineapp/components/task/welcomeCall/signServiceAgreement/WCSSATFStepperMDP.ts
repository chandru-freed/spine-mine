import FStepperMDP from "@/components/generic/FStepperMDP";
import FlowTaskIntf from "@/section/spineapp/util/FlowTaskIntf";
import WCSSATStepFFormMDP from "./WCSSATStepFFormMDP";

export default class WCSSATFStepperMDP extends FStepperMDP {
    taskRoot: FlowTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: FlowTaskIntf }) {
        super({ myRefName: "wCSSATFStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Sign Service Agreement", stepContent: new WCSSATStepFFormMDP({ taskRoot: taskRoot, parent: this }) })

    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}