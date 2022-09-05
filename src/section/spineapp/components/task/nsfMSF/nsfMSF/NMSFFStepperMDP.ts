import FStepperMDP from "@/components/generic/FStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import NMSFTFFormMDP from "./step1/NMSFTFFormMDP";
import NMSFTFinalFFormMDP from "./step2/NMSFTFinalFFormMDP";


export default class NMSFFStepperMDP extends FStepperMDP {
    taskRoot: ManualTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
        super({ myRefName: "nsfMSFStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Call", stepContent: new NMSFTFFormMDP({ taskRoot: taskRoot, parent: this }) })
        .addStep({name: "Mark Complete", stepContent: new NMSFTFinalFFormMDP({ taskRoot: taskRoot, parent: this })})
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}