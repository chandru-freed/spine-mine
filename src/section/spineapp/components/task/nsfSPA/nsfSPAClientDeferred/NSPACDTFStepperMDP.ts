import FStepperMDP from "@/components/generic/FStepperMDP";
import DeferredTaskIntf from "@/section/spineapp/util/DeferredTaskIntf";
import NSPACDTStepFFormMDP from "./NSPACDTStepFFormMDP";

export default class NSPACDTFStepperMDP extends FStepperMDP {
    taskRoot: DeferredTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: DeferredTaskIntf }) {
        super({ myRefName: "nsfSPAClientDeferredStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Nsf SPA Client Deferred", stepContent: new NSPACDTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}