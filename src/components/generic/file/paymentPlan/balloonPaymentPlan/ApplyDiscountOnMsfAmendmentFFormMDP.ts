import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";

import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";

export default class ApplyDiscountOnMsfAmendmentFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    parent: any;
    constructor({ parent,taskRoot }: { parent: any,taskRoot: any }) {
        super({ myRefName: "ApplyDiscountOnMsfRef" });
        this.parent = parent;
        this.taskRoot =  taskRoot;
        this
            .addField(
                new FCurrencyFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "msfDiscountAmount",
                    label: "Discount Amount",
                    boundaryClass: "col-6"
                })
            ).addField(
                new FGompaUserRemoteAutoCompleteFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "approvedBy",
                    label: "Approved By",
                    boundaryClass: "col-6"
                })
            ).addAction(new FBtnMDP({
                label: "Cancel",
                onClick: this.handleCancelClick(),
                btnType: BtnType.TEXT
            })).addAction(new FBtnMDP({
                label: "Apply Discount",
                onClick: this.handleApplyDiscount(),
            }))
    }
    handleApplyDiscount() {
        return () => {
            console.log(this.parent.paymentPlan,"Payment plan")
            const input = (this.parent.applyDiscountInput as Data.ClientFile.ApplyDiscountOnMsfAmendmentInput);
            input.amendmentToken = this.taskRoot?.taskFormData?.taskInput?.amndToken;
            FSnackbar.confirm({
                onConfirm: () => {
                    Action.ClientFile.ApplyDiscountOnMsfAmendment.execute(input, output => {
                        this.parent.resetFormsTableAndData()
                    });
                }
            })
        }
    }

    handleCancelClick() {
        return () => {
            this.parent.resetFormsTableAndData()
        }
    }
}
