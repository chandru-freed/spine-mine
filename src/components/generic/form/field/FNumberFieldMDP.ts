import FFieldMDP from "@/components/generic/form/field/FFieldMDP";
import { FFormChildMDP } from "@/components/generic/form/FFormMDP";

export default class FNumberFieldMDP implements FFieldMDP {
  componentName = "FNumberField";
  dataSelectorKey: string;
  label: string;
  type: string = "text";
  rules: string;
  mandatory: boolean;
  parentMDP: FFormChildMDP;
  boundaryClass: string;
  disabled: boolean;
  condition: boolean;
  // defaultValue?: string;

  constructor({
    parentMDP,
    dataSelectorKey,
    label,
    rules = "",
    mandatory = false,
    boundaryClass = "col-12",
    disabled = false,
    condition = true,
  }: // defaultValue
  {
    parentMDP: FFormChildMDP;
    dataSelectorKey: string;
    label: string;
    rules?: string;
    mandatory?: boolean;
    boundaryClass?: string;
    disabled?: boolean;
    condition?: boolean;
    // defaultValue?: string
  }) {
    this.parentMDP = parentMDP;
    this.dataSelectorKey = dataSelectorKey;
    this.label = label;
    this.rules = rules;
    this.mandatory = mandatory;
    this.boundaryClass = boundaryClass;
    this.disabled = disabled;
    this.condition = condition;
    // this.defaultValue = defaultValue;
  }

  getRules() {
    const required = this.mandatory ? "required" : "";
    return `${required}|${this.rules}`;
  }

  getBoundaryClass() {
    return `${this.boundaryClass} py-0 px-2`;
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      dataSelectorKey: this.dataSelectorKey,
      rules: this.getRules(),
      boundaryClass: this.getBoundaryClass(),
      condition: this.condition,
      props: {
        id: this.dataSelectorKey,
        label: this.label,
        type: this.type,
        outlined: this.parentMDP.outlined,
        dense: this.parentMDP.dense,
        disabled: this.disabled,
        // defaultValue: this.defaultValue
      },
    };
  }
}
