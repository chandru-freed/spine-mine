import FStepperMDP from "@/components/generic/FStepperMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import DCSDTStepFFormMDP from "./DCSDTStepFFormMDP"

export default class DCSDTFStepperMDP extends FStepperMDP {
    taskRoot: SelfTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: SelfTaskIntf }) {
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