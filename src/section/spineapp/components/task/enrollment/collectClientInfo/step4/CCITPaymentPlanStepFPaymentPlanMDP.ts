import FBtnMDP from "@/components/generic/FBtnMDP";
import FPaymentPlanMDP from "@/components/generic/file/paymentPlan/FPaymentPlanMDP";

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
    );
  }

  saveTask() {
    return () => {
      this.taskRoot.saveTask();
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
}
