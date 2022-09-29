import FPaymentPlanMDP from "@/components/generic/file/paymentPlan/FPaymentPlanMDP";


export default class FilePaymentPlanFPaymentPlanMDP extends FPaymentPlanMDP {
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            taskRoot: taskRoot,
            parent: parent,
            myRefName: "filePaymentPlanRef",
            disabled: true,
            readonly: true
        });

    }

    getMyRef() {
        return this.parent.getMyRef().$refs[this.myRefName];
    }
}