import FStepperMDP from "@/components/generic/FStepperMDP";
import SelfTaskIntf from "@/section/spineapp/util/SelfTaskIntf";
import GLTGenerateStepFFormMDP from "./GLTGenerateStepFFormMDP";


export default class GLTFStepperMDP extends FStepperMDP {
    taskRoot: SelfTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: SelfTaskIntf }) {
        super({ myRefName: "generateLinkStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({name: "Generate Link", stepContent: new GLTGenerateStepFFormMDP({taskRoot: taskRoot, parent: this})})
    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}