import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";
import FPasswordFieldMDP from "@/components/generic/form/field/FPasswordFieldMDP";

export default class ResetPasswordFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ myRefName: "ResetPasswordRef" });
        this.parent = parent;
        this
            .addField(
                new FPasswordFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "newPassword",
                    label: "New Password",
                    boundaryClass: "col-6"
                })
            )
            .addAction(new FBtnMDP({
                label: "Cancel",
                onClick: this.handleCancelClick(),
                btnType: BtnType.TEXT
            }))
            .addAction(new FBtnMDP({
                label: "Reset Password",
                onClick: this.resetPassword()
            }))
    }

    handleCancelClick() {
        return () => {
            this.parent.closeAndResetForms();
        }
    }
    resetPassword() {
        return () => {
            Action.Spine.ResetPassword.execute(this.parent.resetPasswordInput, output => {
                FSnackbar.success("Successfully reset the password");
                this.parent.closeAndResetForms();
            })
        }
    }
}
