import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSelectDateFieldMDP from "../../form/field/FDateSelectFieldMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FRemoteComboBoxFieldMDP from "../../form/field/FRemoteComboBoxFieldMDP";
import FAccountFieldMDP from "../../form/field/FAccountFieldMDP";
import * as Snackbar from 'node-snackbar';
import AddressFMiniFormMDP from "../../form/field/AddressFMiniFormMDP";
import FIFSCCodeFieldMDP from "../../form/field/FIFSCCodeFieldMDP";

export default class FAddEMandateFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            myRefName: "addEMandateFormRef",
            disabled: taskRoot.taskDisabled,
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this.addField(
            new FAccountFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "accountNumber",
                label: "Account Number",
                mandatory: true,
                boundaryClass: "col-4",
            })
        )
            .addField(
                new FAccountFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "confirmAccountNumber",
                    label: "Confirm Account Number",
                    mandatory: true,
                    boundaryClass: "col-4",
                    rules: "confirmed:accountNumber",
                })
            )
            .addField(
                new FSelectFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "nupayBankMasterId",
                    label: "Bank Name",
                    boundaryClass: "col-4",
                    mandatory: true,
                    options: this.taskRoot.nupayBankMasterList,
                    optionLabel: "nupayBnkName",
                    optionValue: "nupayBankMasterId",
                })
            )
            .addField(
                new FIFSCCodeFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "ifscCode",
                    label: "IFSC Code",
                    mandatory: true,
                    boundaryClass: "col-4",
                    onSelect: (details) => {
                        this.populateEMandateBankDetails(details);
                    },
                    disabled: this.disabled
                })
            )
            .addField(
                new FSelectFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "accountType",
                    label: "Account Type",
                    boundaryClass: "col-4",
                    mandatory: true,
                    options: [
                        { id: "SAVINGS", name: "SAVINGS" },
                        { id: "CURRENT", name: "CURRENT" },
                    ],
                    optionLabel: "name",
                    optionValue: "id",
                })
            )
            .addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "accountHolderName",
                    label: "Account Holder Name",
                    mandatory: true,
                    boundaryClass: "col-4",
                })
            )
            .addField(
                new FAccountFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "amount",
                    label: "Amount",
                    mandatory: true,
                    boundaryClass: "col-6",
                })
            ).addField(
                new FSelectDateFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "draftDate",
                    label: "Draft Date",
                    boundaryClass: "col-6",
                    mandatory: true,
                    futureDaysDisabled: true,
                })
            )
            .addField(
                new AddressFMiniFormMDP({
                    taskRoot: this.taskRoot,
                    parent: this,
                    dataSelectorKey: "bankAddress",
                    disabled: taskRoot.taskDisabled,
                    label: "Bank Address",
                    mandatory: true,
                })
            )

            .addAction(
                new FBtnMDP({
                    label: "Cancel",
                    btnType: BtnType.TEXT,
                    onClick: () => {
                        this.closeAddForm();
                    },
                })
            )
            .addAction(
                new FBtnMDP({
                    label: "Add EMandate",
                    onClick: this.submitAddEMandate(),
                })
            );
    }

    getMyRef() {
        return this.parent.getMyRef().$refs[this.myRefName];
    }

    submitAddEMandate() {
        return () => {
            this.getMyRef().submitForm(() => {
                this.addEMandate();
            });
        };
    }

    closeAddForm() {
        this.parent.getMyRef().closeAndClearAllForms();
    }

    populateEMandateBankDetails(details: any) {
        this.parent.getMyRef().populateEMandateBankDetails(details);
    }

    addEMandate() {
        const input = Data.Spine.AddEMandateInput.fromJson(
            this.parent.getMyRef().addEMandateForm
        );
        input.clientFileId = (
            this.taskRoot as any
        ).clientFileBasicInfo.clientFileId;
        input.taskId = this.taskRoot.taskId;
        // Action.Spine.AddEMandate.execute(input, (output) => {
        //     this.parent.getMyRef().closeAndClearAllForms();
        //     Snackbar.show({
        //         text: "Succesfully saved",
        //         pos: "bottom-center"
        //     });
        // });
    }
}
