import FStepperMDP from "@/components/generic/FStepperMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import { ReceiveMSFPayment } from "src-gen/action/clientfile-action";
import CollectMSFTaskStepFFormMDP from "./CollectMSFTaskStepFFormMDP";

export default class CollectMSFTaskFStepperMDP extends FStepperMDP {
    taskRoot: any;
    parent: any;
    constructor({ taskRoot }: { taskRoot: any }) {
        super({ myRefName: "collectMSFStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;
        this.addStep({ name: "Collect MSF", stepContent: new CollectMSFTaskStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}