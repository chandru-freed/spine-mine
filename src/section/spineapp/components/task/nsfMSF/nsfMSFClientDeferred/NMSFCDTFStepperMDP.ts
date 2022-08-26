import FStepperMDP from "@/components/generic/FStepperMDP";
import DeferredTaskIntf from "@/section/spineapp/util/DeferredTaskIntf";
import NMSFCDTStepFFormMDP from "./NMSFCDTStepFFormMDP";

export default class NMSFCDTFStepperMDP extends FStepperMDP {
    taskRoot: DeferredTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: DeferredTaskIntf }) {
        super({ myRefName: "nsfMSFClientDeferredStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Nsf MSF Client Deferred", stepContent: new NMSFCDTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}