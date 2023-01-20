import FCFAPaymentPlanMDP from "@/components/generic/file/paymentPlan/cfAdminPaymentPlan/FCFAPaymentPlanMDP";



export default class CFAPaymentPlanInfoFPaymentPlanMDP extends FCFAPaymentPlanMDP {
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            taskRoot: taskRoot,
            parent: parent,
            myRefName: "cfPaymentPlanInfoRef",
            disabled: false,
            readonly: false
        });

    }

    getMyRef() {
        return this.parent.$refs[this.myRefName];
    }
}