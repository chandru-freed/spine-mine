import FPaymentPlanMDP from "@/components/generic/file/paymentPlan/FPaymentPlanMDP";

export default class UTPaymentPlanStepFPaymentPlanMDP extends FPaymentPlanMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "paymentPlanRef",
      disabled: true,
      dataSelectorKey: "taskInput",
    });
  }
  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }
}
