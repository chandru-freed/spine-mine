import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import ClientDetailsIntf from "../client/ClientDetailsIntf";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";

export default class ClientSearchFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  root: ClientDetailsIntf;
  // parent: any;
  constructor({ root }: { root: ClientDetailsIntf }) {
    super({
      myRefName: "ClientSearchFFormRef",
    });
    this.root = root;
    // this.parent = parent;

    this
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "firstName",
          label: "Name",
          mandatory: true,
          boundaryClass: "col-4",
        })
      )
      .addField(new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "mobile",
        label: "Mobile",
        boundaryClass: "col-4"
      }))
      .addField(
        new FEmailFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "emailId",
          label: "Email",
          boundaryClass: "col-4"
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Search",
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
