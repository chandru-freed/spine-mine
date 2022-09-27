import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FAccountFieldMDP from "@/components/generic/form/field/FAccountFieldMDP";
import FTimeFieldMDP from "@/components/generic/form/field/FTimeFieldMDP";
import TestIntf from "./TestIntf";
import FFooTextFieldMDP from "@/components/generic/form/field/FFooTextFieldMDP";
import FNumberTextFieldMDP from "@/components/generic/form/field/FNumberTextFieldMDP";

export default class TestFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  root: TestIntf;
  // parent: any;
  constructor({ root }: { root: TestIntf }) {
    super({
      myRefName: "testFFromRef",
    });
    this.root = root;
    // this.parent = parent;

    this.addField(
      new FNumberTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "firstName",
        label: "Pincode",
        boundaryClass: "col-4",
        mask: "######",
        unmask: "######",
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "name",
          label: "Name",
          boundaryClass: "col-4",
          mask: "### ###",
          unmask: "######",
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
    return () => {};
  }
}
