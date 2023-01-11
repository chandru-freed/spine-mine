import FBtnMDP from "@/components/generic/FBtnMDP";
import FBudgetMDP from "@/components/generic/file/budget/FBudgetMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";

export default class MCITBudgetStepFBudgetMDP extends FBudgetMDP {
  budgetFormRef = "budgetFormRef";
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "wecomeCallBudgetStepRef",
      disabled: taskRoot.taskDisabled,
      // disabled: true,
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
