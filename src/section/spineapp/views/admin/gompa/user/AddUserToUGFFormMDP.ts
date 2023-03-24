import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FClientLanguageSelectFieldMDP from "@/components/generic/form/field/FClientLanguageSelectFieldMDP";
import FPasswordFieldMDP from "@/components/generic/form/field/FPasswordFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from '@/../src-gen/data';
import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from '@/../src-gen/action';
import FSnackbar from "@/fsnackbar";
import FGenLeadSquareIdFieldMDP from "@/components/generic/form/field/FGenLeadSquareIdFieldMDP";

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
      new FGenLeadSquareIdFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "emailId",
        label: "Email Id",
        mandatory: true,
        boundaryClass: "col-4",
        onSelect: (leadSquareId) => {this.prepopulateLeadSquareId(leadSquareId)}
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
      dataSelectorKey: "languageList",
      label: "LanguageList",
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
        options: userGroupList,
        optionLabel: 'name',
        optionValue: 'value',
        // multiple: true
      })
    ).addAction(new FBtnMDP({
      label: "Cancel",
      onClick: this.handleCancelClick(),
      btnType: BtnType.TEXT
    })).addAction(new FBtnMDP({
      label: "Create User",
      onClick: this.createUser()
    }))
  }
  getMyRef(): any {
    return this.parent.$refs[this.myRefName];
  }

  prepopulateLeadSquareId(leadSquareId: string) {
    this.parent.prepopulateLeadSquareId(leadSquareId);
  }
  createUser() {
    return () => {
      this.getMyRef().submitForm(() => {
        Action.Spine.AddUserToUserGroup.execute(this.parent.addUserInput, (output) => {
          this.parent.gotoDetailsPage(this.parent.addUserInput.userName);
          this.parent.resetAddUserInput();
          this.getMyRef().reset();
          FSnackbar.success("Successfully added the user");
        });
      })
    }
  }
  handleCancelClick() {
    return () => {
      this.parent.showCreateUserForm = false;
    }
  }
}



const userGroupList = [
  {
    name: "Sales Rep - (ug-sales-rep)",
    value: ["ug-sales-rep"]
  },
  {
    name: "Sales Lead - (ug-sales-lead)",
    value: ["ug-sales-lead"]
  },
  {
    name: "Sales Manager - (ug-sales-rep-mgr)",
    value: ["ug-sales-rep-mgr"]
  },
  {
    name: "Customer Service - (ug-customer-service)",
    value: ["ug-customer-service"]
  },
  {
    name: "Customer Service Manager - (ug-customer-service,ug-customer-service-mgr)",
    value: ["ug-customer-service","ug-customer-service-mgr"]
  },
  {
    name: "Admin - (ug-customer-service,ug-spine-admin,ug-customer-service-mgr)",
    value: ["ug-customer-service","ug-spine-admin","ug-customer-service-mgr"]
  },
  {
    name: "MIS - (ug-customer-service,ug-operations,ug-customer-service-mgr)",
    value: ["ug-customer-service","ug-operations","ug-customer-service-mgr"]
  }
]