import FFieldMDP from "./FFieldMDP";

export default class FTextFieldMDP implements FFieldMDP {
  componentName = "FTextField";
  dataSelector: string;
  label: string;
  type: string;
  rules: string
  mandatory: boolean

  constructor({
    dataSelector,
    label,
    type = "text",
    rules = "",
    mandatory = false,
  }: {
    dataSelector: string;
    label: string;
    type?: string;
    rules?: string
    mandatory?: boolean
  }) {
    this.dataSelector = dataSelector;
    this.label = label;
    this.type = type;
    this.rules = rules
    this.mandatory = mandatory
  }

  getRules() {
    const required = (this.mandatory) ? "required" : ""
    return `${required}|${this.rules}`
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      dataSelector: this.dataSelector,
      rules: this.getRules(),
      props: {
        id: this.dataSelector,
        label: this.label,
        type: this.type,
      },
    };
  }
}
