import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import CreateClientIntf from "./CreateClientIntf";

export default class CreateClientFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  root: CreateClientIntf;
  // parent: any;
  constructor({ root }: { root: CreateClientIntf }) {
    super({
      myRefName: "createClientFFormRef",
    });
    this.root = root;
    // this.parent = parent;

    this
      .addField(
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
      .addField(
        new FPhoneFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "leadSource",
          label: "Lead Source",
          boundaryClass: "col-4",
          disabled: true
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Create",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  getMyRef(): any {
    return this.root.$refs[this.myRefName];
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.createClient());
    };
  }

  createClient() {
    return () => {
      this.root.createClient();
    };
  }
}
