import FStepperMDP from "@/components/generic/FStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/ManualTaskIntf";
import NSPACTStepFFormMDP from "./NSPACTStepFFormMDP";


export default class NSPACTFStepperMDP extends FStepperMDP {
    taskRoot: ManualTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
        super({ myRefName: "nsfSPACompletionStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;
        this.addStep({
            name: "Nsf SPA Completion",
            stepContent: new NSPACTStepFFormMDP({ taskRoot: this.taskRoot, parent: this })
        })
    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}