import FPaymentPlanMDP from "@/components/generic/file/paymentPlan/FPaymentPlanMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FEPaymentPlanMDP from "@/components/generic/file/paymentPlan/enrollmentPaymentPlan/FEPaymentPlanMDP";

export default class ECFTPaymentPlanStepFPaymentPlanMDP extends FEPaymentPlanMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "paymentPlanRef",
      disabled: taskRoot.taskDisabled,
      dataSelectorKey: "taskOutput",
    });
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }
}
