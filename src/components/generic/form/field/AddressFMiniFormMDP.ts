import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FMiniFormMDP from "@/components/generic/form/field/FMiniFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FNumberFieldMDP from "./FNumberFieldMDP";
import FNumberTextFieldMDP from "@/components/generic/form/field/FNumberTextFieldMDP";
import FRemoteComboBoxFieldMDP from "./FRemoteComboBoxFieldMDP";

export default class AddressFMiniFormMDP extends FMiniFormMDP {
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
      // parentMDP: new FFormChildMDP(),
      // dataSelectorKey: "residentialAddress",
      // disabled: taskRoot.taskDisabled,
      // label: "Residential Address",
      // mandatory: true,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextareaMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "addressLine1",
        label: "Address Line 1",
        mandatory: true,
      })
    )
    // .addField(
    //   new FRemoteComboBoxFieldMDP({
    //     parentMDP: this.childMDP,
    //     dataSelectorKey: "city",
    //     label: "City",
    //     mandatory: true,
    //     boundaryClass: "col-3",
    //     queryUrl: "/spineapi/master/find-city-and-state?cityName=",
    //   })
    // )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "city",
          label: "City",
          mandatory: true,
          boundaryClass: "col-3",
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "state",
          label: "State",
          mandatory: true,
          boundaryClass: "col-3",
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "country",
          label: "Country",
          mandatory: true,
          boundaryClass: "col-3",
          // defaultValue: "India"
        })
      )
      .addField(
        new FNumberTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "pinCode",
          label: "Pin Code",
          mandatory: true,
          boundaryClass: "col-3",
          rules: "digits:6",
          mask: "######",
          unmask: "######",
        })
      );
  }

  getMiniFormFieldRules(rules: string) {
    return `${this.mandatory ? rules : ""}`;
  }
}
