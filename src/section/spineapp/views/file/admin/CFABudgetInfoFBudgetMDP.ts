import FBtnMDP from "@/components/generic/FBtnMDP";
import FBudgetMDP from "@/components/generic/file/budget/FBudgetMDP";

import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";

export default class CFABudgetInfoFBudgetMDP extends FBudgetMDP {
  budgetFormRef = "budgetFormRef";
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "cfBudgetInfoRef",
      disabled: false
    });
    this.addAction(new FBtnMDP({
      label: "Save",
      onClick: this.validateAndSubmit()
    }))
  }


  // new implement
  validateAndSubmit() {
    return () => {
      console.log(this.getMyRef(),"this.getMyRef()")
      this.getMyRef().submitForm(() => {
        this.updateBudgetInfo();
      });
    };
  }

  updateBudgetInfo() {
    const input = Data.Spine.UpdateBudgetInfoInput.fromJson(
      this.taskRoot.taskFormData.taskOutput.budgetInfo
    );
    input.clientFileId = (
      this.taskRoot as any
    ).clientFileBasicInfo.clientFileId;
    input.taskId = this.taskRoot.taskId;
    Action.Spine.UpdateBudgetInfo.execute(input, (output: any) => {
      FSnackbar.success("Succesfully Saved");
      
    });
  }

  getMyRef() {
    return this.parent.$refs[this.myRefName].$refs[this.budgetFormRef];
  }
}
