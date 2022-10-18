import FBtnMDP from "@/components/generic/FBtnMDP";
import FPaymentPlanMDP from "@/components/generic/file/paymentPlan/FPaymentPlanMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";

export default class MCITPaymentPlanStepFPaymentPlanMDP extends FPaymentPlanMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "welcomeCallPaymentPlanRef",
      disabled: taskRoot.taskDisabled,
      dataSelectorKey: "taskOutput",
      disabledActionBtn: true
    });

    this.addAction(
      new FBtnMDP({
        label: "Previous",
        onClick: this.goToPrevStep(),
      })
    ).addAction(
      new FBtnMDP({
        label: "Save",
        onClick: this.saveTask(),
      })
    ).addAction(
      new FBtnMDP({
        label: "Save And Next",
        onClick: this.saveAndNext(),
      })
    );;
  }

  saveTask() {
    return () => {
      this.schedulePaymentPlan();
    };
  }

  saveAndNext() {
    return () => {
        this.schedulePaymentPlan(true);
    }
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  schedulePaymentPlan(goToNextStep: boolean = false) {
    console.log(this.taskRoot.taskFormData.taskOutput.paymentPlan)
    const input = Data.Spine.SchedulePaymentPlanInput.fromJson(this.taskRoot.taskFormData.taskOutput.paymentPlan)
    input.clientFileId = (this.taskRoot as any).clientFileBasicInfo.clientFileId;
    input.taskId = this.taskRoot.taskId;
    Action.Spine.SchedulePaymentPlan.execute(input, (output: any) => {
      Snackbar.show({
        text: "Succesfully Saved",
        pos: "bottom-center",
      });
      if (goToNextStep) {
        (this.taskRoot as any).goToStep(4);
      }
    })
  }
  goToPrevStep() {
    return () => {
      (this.taskRoot as any).goToStep(2);
    }
  }
}
