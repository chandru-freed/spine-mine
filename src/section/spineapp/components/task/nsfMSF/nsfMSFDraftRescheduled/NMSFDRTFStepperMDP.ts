import FStepperMDP from "@/components/generic/FStepperMDP";
import SelfTaskIntf from "@/section/spineapp/util/SelfTaskIntf";
import NMSFDRTRescheduleStepFFormMDP from "./NMSFDRTRescheduleStepFFormMDP";

export default class NMSFDRTFStepperMDP extends FStepperMDP {
    taskRoot: SelfTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: SelfTaskIntf }) {
        super({ myRefName: "nsfMSFDraftRescheduledStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Draft Reschedule", stepContent: new NMSFDRTRescheduleStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }
    getMyRef() {
        console.log(this.parent.$refs);
        return this.taskRoot.$refs[this.myRefName];
    }
}
