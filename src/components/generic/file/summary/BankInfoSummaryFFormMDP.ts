import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FNupayBankSelectFieldMDP from "@/components/generic/form/field/FNupayBankSelectFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class BankInfoSummaryFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  constructor() {
    super({
      myRefName: "bankInfoSummaryFForm",
    });

    this.addField(
      new FTextFieldMDP({
        dataSelectorKey: "bankInfoStore.accountNumber",
        label: "Account Number",
        parentMDP: this.childMDP,
        readonly: true,
        boundaryClass: "col-4",
      })
    ).addField(
      new FNupayBankSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "bankInfoStore.nupayBankMasterId",
        label: "Bank Name",
        boundaryClass: "col-4",
        readonly: true,
        mandatory: true,
      })
    ).addField(
      new FTextFieldMDP({
        dataSelectorKey: "bankInfoStore.ifscCode",
        label: "IFSC Code",
        parentMDP: this.childMDP,
        readonly: true,
        boundaryClass: "col-4",
      })
    ).addField(
      new FTextFieldMDP({
        dataSelectorKey: "bankInfoStore.accountHolderName",
        label: "Account Holder Name",
        parentMDP: this.childMDP,
        readonly: true,
        boundaryClass: "col-4",
      })
    );
  }
}
