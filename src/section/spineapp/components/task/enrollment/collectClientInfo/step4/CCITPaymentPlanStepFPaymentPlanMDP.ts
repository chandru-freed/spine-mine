import FBtnMDP from "@/components/generic/FBtnMDP";
import FPaymentPlanMDP from "@/components/generic/file/paymentPlan/FPaymentPlanMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

export default class CCITPaymentPlanStepFPaymentPlanMDP extends FPaymentPlanMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "paymentPlanRef",
      disabled: taskRoot.taskDisabled,
      dataSelectorKey: "taskOutput"
    });

    this.addAction(
      new FBtnMDP({
        label: "Previous",
        onClick: this.goToPrevStep(),
      })
    )
    .addAction(
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
    ).addAction(
      new FBtnMDP({
        label: "Save And Next",
        onClick: this.goToNextStep(),
      })
    );
  }

  saveTask() {
    return () => {
      this.schedulePaymentPlan();
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
    console.log("CCITPaymentPlanStepFPaymentPlanMDP", this.parent.getMyRef().$refs[this.myRefName][0]);
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  schedulePaymentPlan() {
    console.log(this.taskRoot.taskFormData.taskOutput.paymentPlan)
    const input = Data.Spine.SchedulePaymentPlanInput.fromJson(this.taskRoot.taskFormData.taskOutput.paymentPlan)
    input.clientFileId = (this.taskRoot as any).clientFileBasicInfo.clientFileId;
    Action.Spine.SchedulePaymentPlan.execute(input, (output: any) => {
      this.taskRoot.saveTask();
    })
  }

  goToPrevStep() {
    return () => {
      (this.taskRoot as any).goToStep(2);
    }
  }
  goToNextStep() {
    return () => {
      (this.taskRoot as any).goToStep(4);
    }
  }
}
