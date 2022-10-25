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
      dataSelectorKey: "taskOutput.budgetInfo",
      disabled: taskRoot.taskDisabled
    });

    this.addAction(
      new FBtnMDP({
        label: "Previous",
        onClick: this.goToPrevStep(),
      })
    ).addAction(
      new FBtnMDP({
        label: "Save",
        onClick: this.validateAndSave(),
      })
    ).addAction(
      new FBtnMDP({
        label: "Save And Next",
        onClick: this.validateAndSaveAndNext(),
      })
    );;
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

  validateAndSaveAndNext() {
    return () => {
      this.getBudgetFormRef().submitForm(() => {
        this.updateBudgetInfo(true);
      });
    }
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

  updateBudgetInfo(goToNextStep: boolean = false) {
    const input = Data.Spine.UpdateBudgetInfoInput.fromJson(this.taskRoot.taskFormData.taskOutput.budgetInfo)
    input.clientFileId = (this.taskRoot as any).clientFileBasicInfo.clientFileId;
    input.taskId = this.taskRoot.taskId;
    Action.Spine.UpdateBudgetInfo.execute(input, (output: any) => {
      Snackbar.show({
        text: "Succesfully Saved",
        pos: "bottom-center",
      });
      if (goToNextStep) {
        (this.taskRoot as any).goToStep(3);
      }
    })
  }



  goToPrevStep() {
    return () => {
      (this.taskRoot as any).goToStep(1);
    }
  }
}
