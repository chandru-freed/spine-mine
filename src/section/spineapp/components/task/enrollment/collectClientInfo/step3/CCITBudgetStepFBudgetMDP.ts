import FBudgetMDP from "@/components/generic/file/budget/FBudgetMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";

export default class CCITBudgetStepFBudgetMDP extends FBudgetMDP {
  budgetFormRef = "budgetFormRef";
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "budgetRef",
      // dataSelectorKey: "taskOutput",
      disabled: taskRoot.taskDisabled,
    });
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }

  getBudgetFormRef() {
    return this.getMyRef()[0].$refs[this.budgetFormRef];
  }

  // new implement
  validateAndSubmit() {
    return (nextCallback?: () => void) => {
      this.getBudgetFormRef().submitForm(() => {
        this.updateBudgetInfo(nextCallback);
      });
    };
  }

  updateBudgetInfo(callback?: () => void) {
    const input = Data.Spine.UpdateBudgetInfoInput.fromJson(
      this.taskRoot.taskFormData.taskOutput.budgetInfo
    );
    input.clientFileId = (
      this.taskRoot as any
    ).clientFileBasicInfo.clientFileId;
    input.taskId = this.taskRoot.taskId;
    console.log(input)
    Action.Spine.UpdateBudgetInfo.execute(input, (output: any) => {
      Snackbar.show({
        text: "Succesfully Saved",
        pos: "bottom-center",
      });
      if (callback) {
        callback();
      }
    });
  }
}
