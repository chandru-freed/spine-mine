import FCFPaymentPlanMDP from "@/components/generic/file/paymentPlan/cfPaymentPlan/FCFPaymentPlanMDP";
import FPaymentPlanMDP from "@/components/generic/file/paymentPlan/FPaymentPlanMDP";

export default class UTPaymentPlanStepFPaymentPlanMDP extends FCFPaymentPlanMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "paymentPlanRef",
      disabled: true,
      dataSelectorKey: "taskInput",
      disabledActionBtn: true,
    });
  }
  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }
}
