import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";

export default class RegisterClientFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  root: any;
  // parent: any;
  constructor({ root }: { root: any }) {
    super({
      myRefName: "createClientFFormRef",
    });
    this.root = root;
    // this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "firstName",
        label: "First Name",
        boundaryClass: "col-4",
        mandatory: true,
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "middleName",
          label: "Middle Name",
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "lastName",
          label: "Last Name",
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FEmailFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "emailId",
          label: "Email",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FPhoneFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "mobile",
          label: "Mobile",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      // .addField(
      //   new FPhoneFieldMDP({
      //     parentMDP: this.childMDP,
      //     dataSelectorKey: "leadSource",
      //     label: "Lead Source",
      //     boundaryClass: "col-4",
      //     disabled: true,
      //   })
      // )
      .addAction(
        new FBtnMDP({
          label: "Cancel",
          onClick: this.cancel(),
          btnType: BtnType.TEXT
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Register Client",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  getMyRef(): any {
    return this.root.$refs[this.myRefName];
  }
  cancel() {
    return () => {
      this.root.goBack();
    }
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.registerClient());
    };
  }

  registerClient() {
    return () => {
      this.root.registerClient();
    };
  }
}
