import FStepperMDP from "@/components/generic/FStepperMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";
import ManualTaskIntf from "@/section/spineapp/util/ManualTaskIntf";
import NMSFCTStepFFormMDP from "./NMSFCTStepFFormMDP";

export default class NMSFCTFStepperMDP extends FStepperMDP {
    taskRoot: ManualTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
        super({ myRefName: "nsfMSFCompletionStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;
        this.addStep({
            name: "Nsf MSF Completion",
            stepContent: new NMSFCTStepFFormMDP({ taskRoot: this.taskRoot, parent: this })
        })
    }
    getMyRef() {
        console.log(this.parent.$refs);
        return this.taskRoot.$refs[this.myRefName];
    }
}