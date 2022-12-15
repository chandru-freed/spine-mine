import FAmendmentPaymentPlanMDP from "@/components/generic/file/amendmentPaymentPlan/FAmendmentPaymentPlanMDP";
import FBPaymentPlanMDP from "@/components/generic/file/paymentPlan/balloonPaymentPlan/FBPaymentPlanMDP";

export default class  PATPPFAPaymentPlanMDP extends FBPaymentPlanMDP {
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
          taskRoot: taskRoot,
          parent: parent,
          myRefName: "paymentPlanRef",
          disabled: taskRoot.taskDisabled,
          // dataSelectorKey: "taskOutput",
          hideMSFTab: true,
          disabledActionBtn: true,
        });
      }
    
      getMyRef() {
        return this.parent.getMyRef().$refs[this.myRefName][0];
      }
}