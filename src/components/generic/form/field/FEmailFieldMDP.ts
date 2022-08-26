import { FFormChildMDP } from "../FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class FEmailFieldMDP extends FTextFieldMDP {
  constructor({
    parentMDP,
    dataSelectorKey,
    label = "Email",
    type ,
    rules,
    mandatory,
    boundaryClass,
    disabled = false
  }: {
    parentMDP: FFormChildMDP;
    dataSelectorKey: string;
    label?: string;
    type?: string;
    rules?: string;
    mandatory?: boolean;
    boundaryClass?: string;
    disabled?: boolean
  }) {
    super({
      parentMDP: parentMDP,
      dataSelectorKey: dataSelectorKey,
      label: label,
      type: type,
      rules: rules,
      mandatory: mandatory,
      boundaryClass: boundaryClass,
      disabled: disabled
    });
  }

  getRules() {
    const required = this.mandatory ? "required" : "";
    return `${required}|email|${this.rules}`;
  }


}
