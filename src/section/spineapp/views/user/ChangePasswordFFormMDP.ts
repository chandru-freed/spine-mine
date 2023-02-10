import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FPasswordFieldMDP from "@/components/generic/form/field/FPasswordFieldMDP";
import * as Action from '@/../src-gen/action';
import FSnackbar from "@/fsnackbar";
import FBtnMDP from "@/components/generic/FBtnMDP";

export default class ChangePasswordFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    parent: any;
    constructor(props: { parent: any }) {
        super({ myRefName: "changePasswordFFormRef" })
        this.parent = props.parent;
        this.addField(new FPasswordFieldMDP({
            label: "Old Password",
            dataSelectorKey: "oldPassword",
            parentMDP: this.childMDP,
            boundaryClass: "col-6",
            mandatory: true
        })).addField(new FPasswordFieldMDP({
            label: "New Password",
            dataSelectorKey: "newPassword",
            parentMDP: this.childMDP,
            boundaryClass: "col-6",
            mandatory: true
        })).addAction(new FBtnMDP({
            label: "Change Password",
            onClick: this.changePassword()
        }))
    }

    getMyRef(): any {
        return this.parent.$refs[this.myRefName];
    }

    changePassword() {
        return () => {
            this.getMyRef().submitForm(() => {
                this.parent.changePasswordInput.userName = this.parent.loggedInUser.userName;
                Action.Spine.ChangePassword.execute(this.parent.changePasswordInput, output => {
                    this.parent.resetChangePasswordInput();
                    this.getMyRef().reset();
                    FSnackbar.success("Successfully changed the password");
                });
            });
        }
    }
}