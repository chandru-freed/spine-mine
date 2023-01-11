import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FMiniFormMDP from "@/components/generic/form/field/FMiniFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FNumberFieldMDP from "./FNumberFieldMDP";
import FNumberTextFieldMDP from "@/components/generic/form/field/FNumberTextFieldMDP";
import FSelectFieldMDP from "./FSelectFieldMDP";
import FNupayBankSelectFieldMDP from "./FNupayBankSelectFieldMDP";
import FAccountFieldMDP from "./FAccountFieldMDP";

export default class AccountFMiniFormMDP extends FMiniFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({
    taskRoot,
    parent,
    dataSelectorKey,
    disabled,
    label,
    mandatory = false,
  }: {
    taskRoot: any;
    parent: any;
    dataSelectorKey: string;
    disabled: boolean;
    label: string;
    mandatory?: boolean;
  }) {
    super({
      parentMDP: new FFormChildMDP(),
      dataSelectorKey: dataSelectorKey,
      disabled: disabled,
      label: label,
      mandatory: mandatory,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;
    
    this
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountHolderName",
          label: "Account Holder Name",
          mandatory: true,
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FAccountFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountNumber",
          label: "Account Number",
          mandatory: true,
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountType",
          label: "Account Type",
          boundaryClass: "col-4",
          options: [
            { id: "SAVINGS", name: "Savings" },
            { id: "CURRENT", name: "Current" },
          ],
          optionLabel: "name",
          optionValue: "id",
          mandatory: true,
        })
      )
      .addField(
        new FNupayBankSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "nupayBankMasterId",
          label: "Bank Name",
          boundaryClass: "col-4",
          mandatory: true,
        })
      ).addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "ifscCode",
          label: "IFSC Code",
          boundaryClass: "col-4",
          disabled: this.disabled,
          rules:"validate_ifsc",
          mandatory: true,
        })
      );
  }

  getMiniFormFieldRules(rules: string) {
    return `${this.mandatory ? rules : ""}`;
  }
}
