import FBtnMDP from "@/components/generic/FBtnMDP";
import FBudgetMDP from "@/components/generic/file/budget/FBudgetMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

export default class MCITBudgetStepFBudgetMDP extends FBudgetMDP {
  budgetFormRef = "budgetFormRef";
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "wecomeCallBudgetStepRef",
      dataSelectorKey: "taskOutput.budgetInfo",
      disabled: taskRoot.taskDisabled
    });

    this.addAction(
      new FBtnMDP({
        label: "Save",
        onClick: this.validateAndSave(),
      })
    );
  }

  saveTask() {
    return () => {
      this.taskRoot.saveTask();
    };
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }

  getBudgetFormRef() {
    return this.getMyRef()[0].$refs[this.budgetFormRef]
  }

  validateAndSave() {
    return () => {
      this.getBudgetFormRef().submitForm(() => {
        console.log("Budget profile");
        console.log("task rook", this.taskRoot);
        this.updateBudgetInfo();
      });
    }
  }

  updateBudgetInfo() {
    const input = Data.Spine.UpdateBudgetInfoInput.fromJson(this.taskRoot.taskFormData.taskOutput.budgetInfo)
    input.clientFileId = (this.taskRoot as any).clientFileBasicInfo.clientFileId;
    Action.Spine.UpdateBudgetInfo.execute(input, (output: any) => {
      this.taskRoot.saveTask();
    })
  }
}
