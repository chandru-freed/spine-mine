import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FClientFileAutoCompleteFieldMDP from "@/components/generic/form/field/FClientFileAutoCompleteFieldMDP";
import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";

export default class CFQRCodeGenerateFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ myRefName: "CFQRCodeGenerateRef" });
        this.parent = parent;
        this.addField(
            new FCurrencyFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "amount",
                label: "Amount",
                mandatory: true
            })
        )
            .addAction(new FBtnMDP({
                label: "Cancel",
                onClick: () => { this.parent.resetForm() },
                btnType: BtnType.TEXT
            }))
            .addAction(new FBtnMDP({
                label: "Generate",
                onClick: () => { this.parent.generateQrCode() }
            }))
    }
}
