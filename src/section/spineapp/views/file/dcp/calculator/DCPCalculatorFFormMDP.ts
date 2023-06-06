import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";

export default class DCPCalculatorFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  root: any;
  // parent: any;
  constructor({ root }: { root: any }) {
    super({
      myRefName: "dcpCalculatorFFormMDP",
    });
    this.root = root;
    // this.parent = parent;

    this.addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "loanAmount",
        label: "Loan Amount",
        boundaryClass: "col-6",
      })
    ).addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "oneTimeFee",
        label: "One Time Fee",
        boundaryClass: "col-6",
        readonly: true
      })
    );
  }

  getMyRef(): any {
    return this.root.$refs[this.myRefName];
  }
}
