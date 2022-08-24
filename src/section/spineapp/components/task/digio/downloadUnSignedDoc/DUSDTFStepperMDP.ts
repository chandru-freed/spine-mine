import FStepperMDP from "@/components/generic/FStepperMDP";
import DownloadUnSignedDocTaskIntf from "./DownloadUnSignedDocTaskIntf";
import DUSDTStepFFormMDP from "./DUSDTStepFFormMDP";

export default class DUSDTFStepperMDP extends FStepperMDP {
    taskRoot: DownloadUnSignedDocTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: DownloadUnSignedDocTaskIntf }) {
        super({ myRefName: "downloadUnSignedDocStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;
        this.addStep({ name: "Download UnSigned Doc", stepContent: new DUSDTStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}