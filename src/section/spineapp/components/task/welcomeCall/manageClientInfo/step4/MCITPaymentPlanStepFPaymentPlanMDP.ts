

import FCFTPaymentPlanMDP from "@/components/generic/file/paymentPlan/cfTaskPaymentPlan/FCFTPaymentPlanMDP";

export default class MCITPaymentPlanStepFPaymentPlanMDP extends FCFTPaymentPlanMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "welcomeCallPaymentPlanRef",
      // disabled: taskRoot.taskDisabled,
      disabled: true,
      dataSelectorKey: "taskOutput",
      disabledActionBtn: true,
    });
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }
}
