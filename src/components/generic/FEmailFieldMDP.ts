import FFieldMDP from "./FFieldMDP";
import { FFormChildMDP } from "./FFormMDP";
import FTextFieldMDP from "./FTextFieldMDP";

export default class FEmailFieldMDP extends FTextFieldMDP {
  constructor({
    parentMDP,
    dataSelectorKey,
    label = "Email",
    type ,
    rules,
    mandatory,
    boundaryClass,
  }: {
    parentMDP: FFormChildMDP;
    dataSelectorKey: string;
    label?: string;
    type?: string;
    rules?: string;
    mandatory?: boolean;
    boundaryClass?: string;
  }) {
    super({
      parentMDP: parentMDP,
      dataSelectorKey: dataSelectorKey,
      label: label,
      type: type,
      rules: rules,
      mandatory: mandatory,
      boundaryClass: boundaryClass,
    });
  }

  getRules() {
    const required = this.mandatory ? "required" : "";
    return `${required}|email|${this.rules}`;
  }


}
