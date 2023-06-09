import FBtnMDP from "@/components/generic/FBtnMDP";
import FPaymentActionStatusBtnMDP from "@/components/generic/FPaymentActionStatusBtnMDP";
import FFormMDP from "@/components/generic/form/FFormMDP"

export default class PaymentDetailsInfoFFormMDP extends FFormMDP {
    parent: any;
    constructor(props: {parent: any;}) {
        super({
            myRefName: "PaymentDetailsInfoRef"
        });
        this.parent = props.parent;

        this.addAction(new FPaymentActionStatusBtnMDP({
            onClick: () => {},
            paymentId: this.parent?.selectedPaymentSummaryToView?.paymentId,
            paymentStatus: this.parent?.selectedPaymentSummaryToView?.status,
        }))
    }
}