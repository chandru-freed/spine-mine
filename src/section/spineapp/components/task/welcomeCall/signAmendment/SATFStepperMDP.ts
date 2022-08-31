
import FStepperMDP from "@/components/generic/FStepperMDP";
import FlowTaskIntf from "@/section/spineapp/util/FlowTaskIntf";
import SATDisplayStepFFormMDP from "./SATDisplayStepFFormMDP";



export default class SATFStepperMDP extends FStepperMDP {
    taskRoot: FlowTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: FlowTaskIntf }) {
        super({ myRefName: "signAmendmentStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;
        this.addStep({
            name:"Display",
            stepContent: new SATDisplayStepFFormMDP({
                taskRoot: taskRoot,
                parent: this,
            })
        })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
