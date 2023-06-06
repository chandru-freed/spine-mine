import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";

export default class DCPRegisterMyCFFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  root: any;
  // parent: any;
  constructor({ root,hideCancel=false }: { root: any;hideCancel?: boolean; }) {
    super({
      myRefName: "createMYCDCPFFFormRef",
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
          condition: !hideCancel
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Add My Client File",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  cancel() {
    return () => {
      this.root.handleRegisterFormCancelClick()
    }
  }

  getMyRef(): any {
    return this.root.$refs[this.myRefName];
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
