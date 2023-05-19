import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
// import FSelectDateFieldMDP from "@/components/generic/form/field/FSelectDateFieldMDP"; 
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FBtnMDP from "@/components/generic/FBtnMDP";

import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";

export default class AddMissingCibInNupayFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ myRefName: "AddMissingCibInNupayRef" });
        this.parent = parent;
        this
            .addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "nupayCustomerId",
                    label: "Nupay Customer Id",
                    boundaryClass: "col-3"
                })
            ).addField(
                new FSelectDateFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "createdOn",
                    label: "Created On",
                    boundaryClass: "col-3"
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "beneficiaryName",
                    label: "Beneficiary Name",
                    boundaryClass: "col-3"
                })
            ).addField(
                new FCurrencyFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "amount",
                    label: "Amount",
                    boundaryClass: "col-3"
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "beneficiaryAccountNumber",
                    label: "Beneficiary Account Number",
                    boundaryClass: "col-3"
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "ifscCode",
                    label: "Ifsc Code",
                    boundaryClass: "col-3"
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "txnType",
                    label: "Txn Type",
                    boundaryClass: "col-3"
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "txnStatus",
                    label: "Txn Status",
                    boundaryClass: "col-3"
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "initiatedBy",
                    label: "Initiated By",
                    boundaryClass: "col-3"
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "nupayRefNumber",
                    label: "Nupay Ref Number",
                    boundaryClass: "col-3"
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "utr",
                    label: "Utr",
                    boundaryClass: "col-3"
                })
            ).addField(
                new FSelectDateFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "lastUpdatedOn",
                    label: "Last Updated On",
                    boundaryClass: "col-3"
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "cibType",
                    label: "Cib Type",
                    boundaryClass: "col-3"
                })
            )
            .addAction(new FBtnMDP({
                label: "Cancel",
                onClick: this.handleCancelClick()
            }))
            .addAction(new FBtnMDP({
                label: "Add missing cib",
                onClick: this.handleAddMissingCib()
            }))
    }

    handleAddMissingCib() {
        return () => {
            const input = (this.parent.addMissingCibInNupayInput as Data.Spine.AddMissingCibInNupayInput)
            input.clientFileNumber = this.parent.nupayPaymentFilter.clientFileNumber;
            Action.Spine.AddMissingCibInNupay.execute(input, output => {
                this.parent.hideAndResetForms();
                FSnackbar.success("Succesfully added missing cib");
            });
        }
    }
    handleCancelClick() {
        return () => {
            this.parent.hideAndResetForms();
        }
    }
}
