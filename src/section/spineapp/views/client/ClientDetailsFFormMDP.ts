import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FFooPhoneField from "@/components/generic/form/field/FFooPhoneFieldMDP";
import ClientDetailsIntf from "./ClientDetailsIntf";

export default class ClientDetailsFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  root: ClientDetailsIntf;
  // parent: any;
  constructor({ root }: { root: ClientDetailsIntf }) {
    super({
      myRefName: "createClientFFormRef",
    });
    this.root = root;
    // this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "clientId",
        label: "Client Id",
        mandatory: true,
        boundaryClass: "col-4",
        disabled: true,
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "firstName",
          label: "First Name",
          boundaryClass: "col-4",
          mandatory: true,
          disabled: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "lastName",
          label: "Last Name",
          boundaryClass: "col-4",
          mandatory: true,
          disabled: true,
        })
      )
      .addField(
        new FEmailFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "emailId",
          label: "Email",
          boundaryClass: "col-4",
          mandatory: true,
          disabled: true,
        })
      )
      .addField(
        new FFooPhoneField({
          parentMDP: this.childMDP,
          dataSelectorKey: "mobile",
          label: "Mobile",
          boundaryClass: "col-4",
          mandatory: true,
          disabled: true,
        })
      )
      .addField(
        new FPhoneFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "leadSource",
          label: "Lead Source",
          boundaryClass: "col-4",
          disabled: true,
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Add A File",
          onClick: this.addClientFile(),
        })
      );
  }

  getMyRef(): any {
    return this.root.$refs[this.myRefName];
  }

  addClientFile() {
    return () => {
      this.root.addClientFile();
    };
  }
}
