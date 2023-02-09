import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FClientLanguageSelectFieldMDP from "@/components/generic/form/field/FClientLanguageSelectFieldMDP";
import FPasswordFieldMDP from "@/components/generic/form/field/FPasswordFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from '@/../src-gen/data';
import FBtnMDP from "@/components/generic/FBtnMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from '@/../src-gen/action';
import FSnackbar from "@/fsnackbar";

export default class AddUserToUGFFormMDP extends FFormMDP {

  childMDP = new FFormChildMDP();
  parent: any;

  constructor({ parent }: { parent: any }) {
    super({
      myRefName: "addUserToUGFFormRef",
    });
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "userName",
        label: "User Name",
        mandatory: true,
        boundaryClass: "col-4",
      })
    ).addField(
      new FPasswordFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "password",
        label: "Password",
        mandatory: true,
        boundaryClass: "col-4",
      })
    ).addField(
      new FEmailFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "emailId",
        label: "Email Id",
        mandatory: true,
        boundaryClass: "col-4",
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "title",
        label: "Title",
        boundaryClass: "col-4",
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "firstName",
        label: "First Name",
        mandatory: true,
        boundaryClass: "col-4",
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "lastName",
        label: "Last Name",
        boundaryClass: "col-4",
      })
    )
    
    .addField(
      new FPhoneFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "mobile",
        label: "Mobile",
        boundaryClass: "col-4",
      })
    ).addField(new FClientLanguageSelectFieldMDP({
      parentMDP: this.childMDP,
      dataSelectorKey: "laguageList",
      label: "LaguageList",
      boundaryClass: "col-4",
      multiple: true
    }))
    .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "leadSquaredUserId",
          label: "LeadSquared User Id",
          boundaryClass: "col-4",
        })
      )
    .addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "userGroupList",
        label: "User Group",
        mandatory: true,
        boundaryClass: "col-4",
        options: Data.Spine.USER_TYPE.list(),
        optionLabel: 'name',
        optionValue: 'id',
        multiple: true
      })
    ).addAction(new FBtnMDP({
      label: "Create User",
      onClick: this.createUser()
    }))
  }
  getMyRef(): any {
    return this.parent.$refs[this.myRefName];
  }
  createUser() {
    return () => {
      this.getMyRef().submitForm(() => {
        Action.Spine.AddUserToUserGroup.execute(this.parent.addUserInput, (output) => {
          this.parent.resetAddUserInput();
          this.getMyRef().reset();
          FSnackbar.success("Successfully added the user");
        });
      })
    }
  }

}