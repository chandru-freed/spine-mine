import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";

import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";

export default class ChangeUserDetailsFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ myRefName: "ChangeUserDetailsRef" });
        this.parent = parent;
        this
            .addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "userName",
                    label: "User Name",
                    disabled: true,
                    boundaryClass: "col-4"
                })
            )
            .addField(
                new FEmailFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "emailId",
                    label: "Email Id",
                    boundaryClass: "col-4"
                })
            )
            .addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "title",
                    label: "Title",
                    boundaryClass: "col-4"
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "firstName",
                    label: "First Name",
                    boundaryClass: "col-4"
                })
            ).addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "lastName",
                    label: "Last Name",
                    boundaryClass: "col-4"
                })
            ).addField(
                new FPhoneFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "mobile",
                    label: "Mobile",
                    boundaryClass: "col-4"
                })
            )
            .addAction(new FBtnMDP({
                label: "Cancel",
                onClick: this.handleCancelClick(),
                btnType: BtnType.TEXT
            }))
            .addAction(new FBtnMDP({
                label: "Change Details",
                onClick: this.changeDetails()
            }))
    }

    handleCancelClick() {
        return () => {
            this.parent.closeAndResetForms();
        }
    }

    changeDetails() {
        return () => {
            Action.Spine.ChangeUserDetails.execute(this.parent.changeUserDetailsInput, output => {
                FSnackbar.success("successfully changed the details")
                this.parent.closeAndResetForms();
            })
        }
    }
}
