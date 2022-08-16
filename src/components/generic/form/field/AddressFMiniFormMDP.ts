
import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FMiniFormMDP from "@/components/generic/form/field/FMiniFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextarea";

export default class AddressFMiniFormMDP extends FMiniFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      parentMDP: new FFormChildMDP(),
      dataSelectorKey: "residentialAddress",
      disabled: taskRoot.taskDisabled,
      label: "Residential Address",
      mandatory: true,
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
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "city",
        label: "City",
        mandatory: true,
        boundaryClass: "col-3",
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "state",
        label: "State",
        mandatory: true,
        boundaryClass: "col-3",
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "country",
        label: "Country",
        mandatory: true,
        boundaryClass: "col-3",
        // defaultValue: "India"
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "pinCode",
        label: "Pin Code",
        mandatory: true,
        boundaryClass: "col-3",
      })
    );
  }

  getMiniFormFieldRules(rules: string) {
    return `${this.mandatory ? rules : ''}`
  }
  
}
