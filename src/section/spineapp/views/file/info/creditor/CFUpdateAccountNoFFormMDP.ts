

import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FBtnMDP from "@/components/generic/FBtnMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSnackbar from "@/fsnackbar";

export default class CFUpdateAccountNoFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({ myRefName: "cfUpdateAccountNoFFormRef" });
        this.parent = parent;
        this.taskRoot = taskRoot;
        this.addField(new FTextFieldMDP({
            parentMDP: this.childMDP,
            dataSelectorKey: "accountNumber",
            label: "Account Number",
            boundaryClass: "col-6",
            mandatory: true,
            rules: "min:4|max:20",
        })).addAction(new FBtnMDP({
            label: "Cancel",
            onClick: this.closeEditForm()
        })).addAction(new FBtnMDP({
            label: "Update Account No",
            onClick: this.submitEditCreditor()
        }))
    }


    getMyRef(): any {
        return this.parent.$refs[this.myRefName];
    }

    submitEditCreditor() {
        return () => {
            this.getMyRef().submitForm(() => {
                // this.parent.getMyRef()[0].editCreditorData();
                this.updateCreditor();
            });
        };
    }

    closeEditForm() {
        return () => {
        this.parent.closeAndClearAllForms();
        }
    }

    updateCreditor() {
        const input = Data.Spine.UpdateCreditorInput.fromJson(
            this.parent.editCreditorForm
        );
        input.clientFileId = (
            this.taskRoot as any
        ).clientFileBasicInfo.clientFileId;
        Action.Spine.UpdateCreditor.execute(input, (output) => {
            this.parent.closeAndClearAllForms();
            FSnackbar.success("Succesfully Updated the account number")
        });
    }
}