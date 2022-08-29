import FBudgetFFormMDP from "@/components/generic/file/budget/FBudgetFFormMDP";
import FBudgetMDP from "@/components/generic/file/budget/FBudgetMDP";

export class UTBudgetStepFBudgetMDP extends FBudgetMDP {
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
          taskRoot: taskRoot,
          parent: parent,
          myRefName: "underwrittingBudgetStepRef",
          dataSelectorKey: "taskInput.budgetInfo",
          disabled: true
        });
    }

    getMyRef() {
        return this.parent.getMyRef().$refs[this.myRefName];
      }
}