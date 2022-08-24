import FStepperMDP from "@/components/generic/FStepperMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";
import CSETStepFFormMDP from './CSETStepFFormMDP'

export default class CSETFStepperMDP extends FStepperMDP {
    taskRoot: GenericTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: GenericTaskIntf }) {
        super({ myRefName: "clientSignExpiredStepperRef" });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({ name: "Client Sign Expired", stepContent: new CSETStepFFormMDP({ taskRoot: taskRoot, parent: this }) })
    }
    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}