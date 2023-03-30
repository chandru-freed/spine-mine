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
import FAutoCompleteFieldMDP from "@/components/generic/form/field/FAutoCompleteFieldMDP";

export default class AddUserGroupToUserFFormMDP extends FFormMDP {

  childMDP = new FFormChildMDP();
  parent: any;

  constructor({ parent }: { parent: any }) {
    super({
      myRefName: "addUGtoUserFFormRef",
    });
    this.parent = parent;

    this.addField(
      new FAutoCompleteFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "userGroupName",
        label: "User Group Name",
        mandatory: true,
        boundaryClass: "col-6",
        options: this.parent.userGroupList,
        itemText: 'userGroupName',
        itemValue: "userGroupName"
      })
    ).addAction(new FBtnMDP({
      label: "Cancel",
      onClick: this.handleCancelClick(),
      btnType: BtnType.TEXT
    })).addAction(new FBtnMDP({
      label: "Add User Group",
      onClick: this.createUserGroup()
    }))
  }
  getMyRef(): any {
    return this.parent.$refs[this.myRefName];
  }

  prepopulateLeadSquareId(leadSquareId: string) {
    this.parent.prepopulateLeadSquareId(leadSquareId);
  }
  createUserGroup() {
    return () => {
      this.getMyRef().submitForm(() => {
        Action.Spine.UpdateUserGroup.execute(this.parent.updateUserGroupInput, (output) => {
          this.parent.resetUserGroupInput();
          this.getMyRef().reset();
          FSnackbar.success("Successfully added the user group");
          setTimeout(() => {
            this.parent.getUserDetails();  
          }, 500);
          
        });
      })
    }
  }
  handleCancelClick() {
    return () => {
      this.parent.showAddUserGroupForm = false;
    }
  }
}



const userGroupList = [
  {
    name: "sales-rep",
    id: "sales-rep"
  },
  {
    name: "ug-sales-lead",
    id: "ug-sales-lead"
  },
  {
    name: "ug-sales-rep-mgr",
    id: "ug-sales-rep-mgr"
  },
  {
    name: "ug-customer-service",
    id: "ug-customer-service"
  },
  {
    name: "ug-customer-service",
    id: "ug-customer-service",
  },
  {
    name: "ug-customer-service-mgr",
    id: "ug-customer-service-mgr",
  },
  {
    name: "ug-customer-service",
    id: "ug-customer-service",
  },

  {
    name: "ug-spine-admin",
    id: "ug-spine-admin",
  },
  
  {
    name: "ug-operations",
    id: "ug-operations",
  },






]