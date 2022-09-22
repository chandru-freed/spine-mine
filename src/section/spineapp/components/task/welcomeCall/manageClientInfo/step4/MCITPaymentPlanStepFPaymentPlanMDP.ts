import FBtnMDP from "@/components/generic/FBtnMDP";
import FPaymentPlanMDP from "@/components/generic/file/paymentPlan/FPaymentPlanMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

export default class MCITPaymentPlanStepFPaymentPlanMDP extends FPaymentPlanMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "welcomeCallPaymentPlanRef",
      disabled: taskRoot.taskDisabled,
      dataSelectorKey: "taskOutput"
    });

    this.addAction(
      new FBtnMDP({
        label: "Save",
        onClick: this.saveTask(),
      })
    );
  }

  saveTask() {
    return () => {
      this.schedulePaymentPlan();
    };
  }

  getMyRef() {
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
}
