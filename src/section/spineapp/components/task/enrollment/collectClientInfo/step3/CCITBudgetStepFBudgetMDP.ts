import FBtnMDP from "@/components/generic/FBtnMDP";
import FBudgetMDP from "@/components/generic/file/budget/FBudgetMDP";

export default class CCITBudgetStepFBudgetMDP extends FBudgetMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "budgetStepRef",
      dataSelectorKey: "taskOutput.budgetInfo",
      disabled: taskRoot.taskDisabled
    });

    this.addAction(
      new FBtnMDP({
        label: "Save",
        onClick: this.saveTask(),
        condition: this.isStarted()
      })
    ).addAction(
      new FBtnMDP({
        label: "Rescue",
        onClick: this.rescueTask(),
        condition: this.isException()
      })
    );
  }

  saveTask() {
    return () => {
      this.taskRoot.saveTask();
    };
  }

  rescueTask() {
    return () => {
      this.taskRoot.rescueTask();
    };
  }

  isStarted() {
    return this.taskRoot.taskDetails.taskState === "STARTED" || this.taskRoot.taskDetails.taskState === "PARTIALLY_COMPLETED";
  }

  isException() {
    return this.taskRoot.taskDetails.taskState === "EXCEPTION_Q" || this.taskRoot.taskDetails.taskState === "EXIT_Q";
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }
}
