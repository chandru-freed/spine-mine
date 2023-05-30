import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";

import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";

export default class ApplyDiscountOnMsfFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ myRefName: "ApplyDiscountOnMsfRef" });
        this.parent = parent;
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
            const input = (this.parent.applyDiscountInput as Data.ClientFile.ApplyDiscountOnMsfInput);
            input.clientFileId = this.parent.clientFileId;
            FSnackbar.confirm({
                onConfirm: () => {
                    Action.ClientFile.ApplyDiscountOnMsf.execute(input, output => {
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
