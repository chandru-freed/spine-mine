import FBtnMDP from "@/components/generic/FBtnMDP";
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
      dataSelectorKey: "taskOutput.budgetInfo",
      disabled: taskRoot.taskDisabled
    });

    // this.addAction(
    //   new FBtnMDP({
    //     label: "Previous",
    //     onClick: this.goToPrevStep(),
    //   })
    // )
    //   .addAction(
    //     new FBtnMDP({
    //       label: "Save",
    //       onClick: this.validateAndSave(),
    //       condition: this.isStarted()
    //     })
    //   ).addAction(
    //     new FBtnMDP({
    //       label: "Rescue",
    //       onClick: this.rescueTask(),
    //       condition: this.isException()
    //     })
    //   ).addAction(
    //     new FBtnMDP({
    //       label: "Save And Next",
    //       onClick: this.validateAndSaveAndNext(),
    //     })
    //   );
  }


  // rescueTask() {
  //   return () => {
  //     this.taskRoot.rescueTask();
  //   };
  // }

  // isStarted() {
  //   return this.taskRoot.taskDetails.taskState === "STARTED" || this.taskRoot.taskDetails.taskState === "PARTIALLY_COMPLETED";
  // }

  // isException() {
  //   return this.taskRoot.taskDetails.taskState === "EXCEPTION_Q" || this.taskRoot.taskDetails.taskState === "EXIT_Q";
  // }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }

  getBudgetFormRef() {
    return this.getMyRef()[0].$refs[this.budgetFormRef]
  }

  // validateAndSave() {
  //   return () => {
  //     this.getBudgetFormRef().submitForm(() => {
  //       console.log("Budget profile");
  //       console.log("task rook", this.taskRoot);
  //       this.updateBudgetInfo();
  //     });
  //   }
  // }

  // validateAndSaveAndNext() {
  //   return () => {
  //     this.getBudgetFormRef().submitForm(() => {
  //       this.updateBudgetInfo(true);
  //     });
  //   }
  // }

  // updateBudgetInfo(goToNextStep: boolean = false) {
  //   const input = Data.Spine.UpdateBudgetInfoInput.fromJson(this.taskRoot.taskFormData.taskOutput.budgetInfo)
  //   input.clientFileId = (this.taskRoot as any).clientFileBasicInfo.clientFileId;
  //   input.taskId = this.taskRoot.taskId;
  //   Action.Spine.UpdateBudgetInfo.execute(input, (output: any) => {
  //     Snackbar.show({
  //       text: "Succesfully Saved",
  //       pos: "bottom-center",
  //     });
  //     if (goToNextStep) {
  //       (this.taskRoot as any).goToStep(3);
  //     }
  //   })
  // }



  // goToPrevStep() {
  //   return () => {
  //     (this.taskRoot as any).goToStep(1);
  //   }
  // }



  // new implement
  validateAndSubmit() {
    return (successCallBack: any) => {
      this.getBudgetFormRef().submitForm(() => {
        this.saveTask(() => successCallBack())
      }
      );
    };
  }

  saveTask(successCallBack: any) {
    this.updateBudgetInfo(() => successCallBack());
  }

  updateBudgetInfo(callback?: () => void) {
    const input = Data.Spine.UpdateBudgetInfoInput.fromJson(this.taskRoot.taskFormData.taskOutput.budgetInfo)
    input.clientFileId = (this.taskRoot as any).clientFileBasicInfo.clientFileId;
    input.taskId = this.taskRoot.taskId;
    Action.Spine.UpdateBudgetInfo.execute(input, (output: any) => {
      Snackbar.show({
        text: "Succesfully Saved",
        pos: "bottom-center",
      });
      if (callback) {
        callback();
      }
    })
  }
}
