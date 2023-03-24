import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FClientLanguageSelectFieldMDP from "@/components/generic/form/field/FClientLanguageSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from '@/../src-gen/action';
import FSnackbar from "@/fsnackbar";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";

export default class AddUserToUGFFormMDP extends FFormMDP {

  childMDP = new FFormChildMDP();
  parent: any;

  constructor({ parent }: { parent: any }) {
    super({
      myRefName: "userDetailsFFormRef",
      readonly: true
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
    )
    .addField(
      new FEmailFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "emailId",
        label: "Email Id",
        mandatory: true,
        boundaryClass: "col-4",
        // onSelect: (leadSquareId) => {this.prepopulateLeadSquareId(leadSquareId)}
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
      multiple: true,
      condition: this.parent.userDetails.languageList !==undefined && this.parent.userDetails.languageList.length>0
    }))
    .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "leadSquaredUserId",
          label: "LeadSquared User Id",
          boundaryClass: "col-4",
          condition: this.parent.userDetails.leadSquaredUserId !==undefined
        })
      )
    .addField(
      new FTextareaMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "userGroupListString",
        label: "User Group",
        mandatory: true,
        boundaryClass: "col-4",
        condition: this.parent.userDetails.userGroupListString !==''
      })
    )
    // .addAction(new FBtnMDP({
    //   label: "Edit",
    //   onClick: this.syncLeadSquaredId()
    // }))
  }
  getMyRef(): any {
    return this.parent.$refs[this.myRefName];
  }

  prepopulateLeadSquareId(leadSquareId: string) {
    this.parent.prepopulateLeadSquareId(leadSquareId);
  }
  syncLeadSquaredId() {
    return () => {
      console.log(this.parent.userDetails,"this.parent.userDetails")
      // this.getMyRef().submitForm(() => {
        Action.Spine.SyncLeadSquareId.execute1(this.parent.userDetails.emailId, (output) => {
          FSnackbar.success("Successfully synced the leadsquared id");
        });
      // })
    }
  }
}

const userGroupList = [
  {
    name: "Sales Rep ",
    value: ["ug-sales-rep"]
  },
  {
    name: "Sales Lead ",
    value: ["ug-sales-lead"]
  },
  {
    name: "Sales Manager",
    value: ["ug-sales-rep-mgr"]
  },
  {
    name: "Customer Service",
    value: ["ug-customer-service"]
  },
  {
    name: "Customer Service Manager",
    value: ["ug-customer-service","ug-customer-service-mgr"]
  },
  {
    name: "Admin",
    value: ["ug-customer-service","ug-spine-admin","ug-customer-service-mgr"]
  },
  {
    name: "MIS",
    value: ["ug-customer-service","ug-operations","ug-customer-service-mgr"]
  }
]