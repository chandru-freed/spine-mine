import FAmendmentPaymentPlanMDP from "@/components/generic/file/amendmentPaymentPlan/FAmendmentPaymentPlanMDP";

export default class  PATPPFAPaymentPlanMDP extends FAmendmentPaymentPlanMDP {
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
}