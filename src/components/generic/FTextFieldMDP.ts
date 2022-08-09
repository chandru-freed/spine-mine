import FFieldMDP from "./FFieldMDP";
import { FFormChildMDP } from "./FFormMDP";

export default class FTextFieldMDP implements FFieldMDP {
  componentName = "FTextField";
  dataSelector: string;
  label: string;
  type: string;
  rules: string;
  mandatory: boolean;
  parentMDP: FFormChildMDP;
  boundaryClass: string

  constructor({
    parentMDP,
    dataSelector,
    label,
    type = "text",
    rules = "",
    mandatory = false,
    boundaryClass = "col-12"
  }: {
    parentMDP: FFormChildMDP;
    dataSelector: string;
    label: string;
    type?: string;
    rules?: string;
    mandatory?: boolean;
    boundaryClass?: string
  }) {
    this.parentMDP = parentMDP;
    this.dataSelector = dataSelector;
    this.label = label;
    this.type = type;
    this.rules = rules;
    this.mandatory = mandatory;
    this.boundaryClass = boundaryClass
  }

  getRules() {
    const required = this.mandatory ? "required" : "";
    return `${required}|${this.rules}`;
  }

  getBoundaryClass() {
    return `${this.boundaryClass} py-0 px-2`
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      dataSelector: this.dataSelector,
      rules: this.getRules(),
      boundaryClass: this.getBoundaryClass(),
      props: {
        id: this.dataSelector,
        label: this.label,
        type: this.type,
        outlined: this.parentMDP.outlined,
        dense: this.parentMDP.dense,
      },
    };
  }
}
