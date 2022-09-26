import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import AddressFMiniFormMDP from "@/components/generic/form/field/AddressFMiniFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FIFSCCodeFieldMDP from "../form/field/FIFSCCodeFieldMDP";
import FAccountFieldMDP from "../form/field/FAccountFieldMDP";

export default class FBankFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({
    taskRoot,
    parent,
    myRefName,
    dataSelectorKey,
    disabled,
  }: {
    taskRoot: any;
    parent: any;
    myRefName: string;
    dataSelectorKey?: string | undefined;
    disabled: boolean;
  }) {
    super({
      myRefName: myRefName,
      dataSelectorKey: dataSelectorKey,
      disabled: disabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FAccountFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "accountNumber",
        label: "Account Number",
        mandatory: true,
        boundaryClass: "col-3",
      })
    )
      .addField(
        new FAccountFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "confirmAccountNumber",
          label: "Confirm Account Number",
          mandatory: true,
          boundaryClass: "col-3",
          rules: "confirmed:accountNumber",
          condition: !disabled
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "nupayBankMasterId",
          label: "Bank Name",
          boundaryClass: "col-3",
          mandatory: true,
          options: this.taskRoot.nupayBankMasterList,
          optionLabel: "nupayBnkName",
          optionValue: "nupayBankMasterId",
        })
      )
      .addField(
        new FIFSCCodeFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "ifscCode",
          label: "IFSC Code",
          mandatory: true,
          boundaryClass: "col-3",
          onSelect: (details) => {
            this.populateBankDetails(details);
          },
          disabled: this.disabled
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountType",
          label: "Account Type",
          boundaryClass: "col-3",
          mandatory: true,
          options: [
            { id: "SAVINGS", name: "SAVINGS" },
            { id: "CURRENT", name: "CURRENT" },
          ],
          optionLabel: "name",
          optionValue: "id",
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountHolderName",
          label: "Account Holder Name",
          mandatory: true,
          boundaryClass: "col-3",
        })
      )
      .addField(
        new AddressFMiniFormMDP({
          taskRoot: this.taskRoot,
          parent: this,
          dataSelectorKey: "bankAddress",
          disabled: taskRoot.taskDisabled,
          label: "Bank Address",
          mandatory: true,
        })
      );
  }

  populateBankDetails(details: any) {
    this.taskRoot.populateBankDetails(details);
  }

  getMyRef(): any {
    return this.parent.getMyRef()[0].$refs[this.myRefName];
  }
}
