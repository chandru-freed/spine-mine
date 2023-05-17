import FCFPaymentPlanMDP from "@/components/generic/file/paymentPlan/cfPaymentPlan/FCFPaymentPlanMDP";
import FCFPaymentPlanMSFMDP from "@/components/generic/file/paymentPlan/cfPaymentPlan/FCFPaymentPlanMSFMDP";
import FPaymentPlanMDP from "@/components/generic/file/paymentPlan/FPaymentPlanMDP";


export default class CFPaymentPlanMSFInfoFPPMSFInfoMDP extends FCFPaymentPlanMSFMDP {
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            taskRoot: taskRoot,
            parent: parent,
            myRefName: "cfPaymentPlanMSFInfoRef",
            disabled: true,
            readonly: true
        });

    }

    getMyRef() {
        return this.parent.getMyRef().$refs[this.myRefName];
    }
}