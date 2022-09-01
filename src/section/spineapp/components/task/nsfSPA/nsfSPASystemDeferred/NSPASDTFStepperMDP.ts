import FStepperMDP from "@/components/generic/FStepperMDP";
import DeferredTaskIntf from "@/section/spineapp/util/DeferredTaskIntf";
import NSPASDTStepFFormMDP from "./NSPASDTStepFFormMDP";

export default class NSPASDTFStepperMDP extends FStepperMDP {
    taskRoot: DeferredTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: DeferredTaskIntf }) {
        super({ myRefName: "nsfSPASystemDeferredStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Nsf SPA System Deferred", stepContent: new NSPASDTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}