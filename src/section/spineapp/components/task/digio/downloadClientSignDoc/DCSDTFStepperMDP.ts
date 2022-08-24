import FStepperMDP from "@/components/generic/FStepperMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";
import DCSDTStepFFormMDP from "./DCSDTStepFFormMDP"

export default class DCSDTFStepperMDP extends FStepperMDP {
    taskRoot: GenericTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: GenericTaskIntf }) {
        super({ myRefName: "downloadClientSignDocStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({name: "Download Client Sign Doc",stepContent: new DCSDTStepFFormMDP({taskRoot: taskRoot, parent: this})})
    }
    getMyRef() {
        console.log(this.parent.$refs);
        return this.taskRoot.$refs[this.myRefName];
    }
}