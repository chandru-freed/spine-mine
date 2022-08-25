import FStepperMDP from "@/components/generic/FStepperMDP";
import MDP from "@/components/generic/MDP";
import SelfTaskIntf  from "@/section/spineapp/util/SelfTaskIntf";
import GEMSTStepFFormMDP from "./GEMSTStepFFormMDP";

export default class GEMSTFStepperMDP extends FStepperMDP {
    taskRoot: SelfTaskIntf
    parent: any
    constructor({ taskRoot }: { taskRoot: SelfTaskIntf }) {
        super({ myRefName: "getEMandateStatusStepperRef" })
        this.taskRoot = taskRoot
        this.parent = this

        this.addStep({ name: "Get Emandate Status", stepContent: new GEMSTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName]
    }
}