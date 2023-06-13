import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

export default class CFCancelPaymentFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    parent: any;
    constructor(props: { parent: any }) {
        super({ myRefName: "CFCancelPaymentFFormRef" });
        this.parent = props.parent;
        this.addField(new FTextareaMDP({
            dataSelectorKey: "reason",
            label: "Reason",
            parentMDP: this.childMDP,
            boundaryClass: "col-6"
        }))
            .addAction(new FBtnMDP({
                label: "Close",
                onClick: this.handleCloseClick()
            }))
            .addAction(new FBtnMDP({
                label: "Cancel Payment",
                onClick: this.handleCancelPayment()
            }))
    }

    handleCancelPayment() {
        return () => {
            const input: Data.ClientFile.CancelPaymentInput = Data.ClientFile.CancelPaymentInput.fromJson(this.parent.cancelInput);
            input.paymentId = this.parent.selectedPaymentToCancel.paymentId;
            Action.ClientFile.CancelPayment.execute(input, output => {
                this.parent.resetFormsTableAndData();
            });
        }
    }
    handleCloseClick() {
        return () => {
            this.parent.resetFormsTableAndData();
        }
    }
}