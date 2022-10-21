import FBtnMDP from "@/components/generic/FBtnMDP";
import FPaymentPlanMDP from "@/components/generic/file/paymentPlan/FPaymentPlanMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";

export default class CCITPaymentPlanStepFPaymentPlanMDP extends FPaymentPlanMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "paymentPlanRef",
      disabled: taskRoot.taskDisabled,
      dataSelectorKey: "taskOutput",
      hideMSFTab: true,
      disabledActionBtn: true
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
    //       onClick: this.saveTask(),
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
    //       onClick: this.saveAndNext(),
    //     })
    //   );
  }

  // saveTask() {
  //   return () => {
  //     this.schedulePaymentPlan();
  //   };
  // }

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
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  // saveAndNext() {
  //   return () => {
  //     this.schedulePaymentPlan(true);
  //   }
  // }

  // schedulePaymentPlan(goToNextStep: boolean = false) {
  //   console.log(this.taskRoot.taskFormData.taskOutput.paymentPlan)
  //   const input = Data.Spine.SchedulePaymentPlanInput.fromJson(this.taskRoot.taskFormData.taskOutput.paymentPlan)
  //   input.clientFileId = (this.taskRoot as any).clientFileBasicInfo.clientFileId;
  //   input.taskId = this.taskRoot.taskId;
  //   Action.Spine.SchedulePaymentPlan.execute(input, (output: any) => {
  //     Snackbar.show({
  //       text: "Succesfully Saved",
  //       pos: "bottom-center",
  //     });
  //     if (goToNextStep) {
  //       (this.taskRoot as any).goToStep(4);
  //     }
  //   })
  // }

  // goToPrevStep() {
  //   return () => {
  //     (this.taskRoot as any).goToStep(2);
  //   }
  // }



  // new implement
  submit() {
    return (successCallBack: any) => {
      this.saveTask(() => successCallBack())
    };
  }

  saveTask(successCallBack: any) {
    this.schedulePaymentPlan(() => successCallBack());
  }

  schedulePaymentPlan(callback?: () => void) {
    console.log(this.taskRoot.taskFormData.taskOutput.paymentPlan)
    const input = Data.Spine.SchedulePaymentPlanInput.fromJson(this.taskRoot.taskFormData.taskOutput.paymentPlan)
    input.clientFileId = (this.taskRoot as any).clientFileBasicInfo.clientFileId;
    input.taskId = this.taskRoot.taskId;
    Action.Spine.SchedulePaymentPlan.execute(input, (output: any) => {
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
