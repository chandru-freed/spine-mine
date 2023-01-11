
import FSettlementPlanMDP from "@/components/generic/file/settlementPlan/FSettlementPlanMDP";
import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import PSTFinalStepFFormMDP from "./PSTFinalStepFFormMDP";

export default class PSTFStepperMDP extends FTaskStepperMDP {
    taskRoot: any;
    parent: any;
    constructor({ taskRoot }: { taskRoot: any }) {
        super({ myRefName: "planSettlementStepperRef", actionable: true });
        this.taskRoot = taskRoot;
        this.parent = taskRoot;

        this.addStep({
            name:"Settlement Plan",
            stepContent:new FSettlementPlanMDP({
                taskRoot: this.taskRoot,
                disabled: this.taskRoot.taskDisabled,
            })
        }).addStep({
            name:"Mark Complete",
            stepContent: new PSTFinalStepFFormMDP({
                taskRoot: this.taskRoot,
                parent: this.parent
            })
        })
    }

    getMyRef() {
        return this.taskRoot.$refs[this.myRefName];
    }
}
