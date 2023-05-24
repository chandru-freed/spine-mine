import FBudgetMDP from "@/components/generic/file/budget/FBudgetMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";

export default class RCFTBudgetStepFBudgetMDP extends FBudgetMDP {
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
    return this.parent.getMyRef()?.$refs[this.myRefName][0];
  }


  getBudgetPreCondition() {
    const financialHealthCheckPercentage = this.getMyRef()?.financialHealthCheckPercentage || 0;
    const exceptionTakenOnHardship = this.taskRoot.clientFileEnrollmentSummary?.enrollmentSummary?.exceptionTakenOnHardship;
    return financialHealthCheckPercentage<-5 || exceptionTakenOnHardship;
  }

  getBudgetFormRef() {
    console.log(this.getMyRef())
    return this.getMyRef().$refs[this.budgetFormRef];
  }

  // new implement
  validateAndSubmit() {
    return (nextCallback?: () => void) => {
      if (
        this.taskRoot.clientFileEnrollmentSummary.enrollmentSummary.isBudgetDone
      ) {
        this.updateBudgetInfo(nextCallback);
      } else {
        this.getBudgetFormRef().submitForm(() => {
          this.updateBudgetInfo(nextCallback);
        });
      }
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
