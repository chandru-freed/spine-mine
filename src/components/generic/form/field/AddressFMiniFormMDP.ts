
import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FMiniFormMDP from "@/components/generic/form/field/FMiniFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

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
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "addressLine1",
        label: "Address Line 1",
        mandatory: true,
        boundaryClass: "col-4",
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "city",
        label: "City",
        boundaryClass: "col-4",
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "state",
        label: "State",
        boundaryClass: "col-4",
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "country",
        label: "Country",
        boundaryClass: "col-4",
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "pinCode",
        label: "Pin Code",
        boundaryClass: "col-4",
      })
    );
  }

  getMiniFormFieldRules(rules: string) {
    return `${this.mandatory ? rules : ''}`
  }
  
}
