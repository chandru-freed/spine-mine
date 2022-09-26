import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FAccountFieldMDP from "@/components/generic/form/field/FAccountFieldMDP";
import FTimeFieldMDP from "@/components/generic/form/field/FTimeFieldMDP";
import TestIntf from "./TestIntf";

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
      new FAccountFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "firstName",
        label: "Credit Card",
        boundaryClass: "col-4",
      })
    )
      .addField(
        new FTimeFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "middleName",
          label: "Time",
          boundaryClass: "col-4",
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
