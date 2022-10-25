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
      disabledActionBtn: true,
    });
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  // new implement
  submit() {
    return (successCallBack: any) => {
      this.saveTask(() => successCallBack());
    };
  }

  saveTask(successCallBack: any) {
    this.schedulePaymentPlan(() => successCallBack());
  }

  schedulePaymentPlan(callback?: () => void) {
    console.log(this.taskRoot.taskFormData.taskOutput.paymentPlan);
    const input = Data.Spine.SchedulePaymentPlanInput.fromJson(
      this.taskRoot.taskFormData.taskOutput.paymentPlan
    );
    input.clientFileId = (
      this.taskRoot as any
    ).clientFileBasicInfo.clientFileId;
    input.taskId = this.taskRoot.taskId;
    Action.Spine.SchedulePaymentPlan.execute(input, (output: any) => {
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
