import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import AddressFMiniFormMDP from "@/components/generic/form/field/AddressFMiniFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";

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
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "accountNumber",
        label: "Account Number",
        mandatory: true,
        boundaryClass: "col-3",
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "name",
          label: "Bank Name",
          mandatory: true,
          boundaryClass: "col-3",
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "ifscCode",
          label: "IFSC Code",
          mandatory: true,
          boundaryClass: "col-3",
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
}
