import FStepperMDP from "@/components/generic/FStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import NSPATFFormMDP from "./step1/NSPATFFormMDP";
import NSPAFTFinalFFormMDP from "./step2/NSPAFTFinalFFormMDP";


export default class NSPAFStepperMDP extends FStepperMDP {
    taskRoot: ManualTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
        super({ myRefName: "nsfSPAStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;
        this.addStep({ name: "Call", stepContent: new NSPATFFormMDP({ taskRoot: taskRoot, parent: this }) })
        .addStep({name: "Mark Complete", stepContent: new NSPAFTFinalFFormMDP({ taskRoot: taskRoot, parent: this })})
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}