import FFieldMDP from "@/components/generic/form/field/FFieldMDP";
import { FFormChildMDP } from "@/components/generic/form/FFormMDP";

export default class FCheckboxGroupMDP implements FFieldMDP {
  componentName = "FCheckboxGroup";
  dataSelectorKey: string;
  label: string;
  rules: string;
  mandatory: boolean;
  parentMDP: FFormChildMDP;
  boundaryClass: string;
  disabled: boolean;
  options: string[];
  optionLabel?: string;
    optionValue?: string;

  constructor({
    parentMDP,
    dataSelectorKey,
    label,
    rules = "",
    mandatory = false,
    boundaryClass = "col-12",
    disabled = false,
    options = [],
    optionValue,
    optionLabel
    
  }: {
    parentMDP: FFormChildMDP;
    dataSelectorKey: string;
    label: string;
    rules?: string;
    mandatory?: boolean;
    boundaryClass?: string;
    disabled?: boolean;
    options: string[];
    optionLabel?: string;
    optionValue?: string;
  }) {
    this.parentMDP = parentMDP;
    this.dataSelectorKey = dataSelectorKey;
    this.label = label;
    this.rules = rules;
    this.mandatory = mandatory;
    this.boundaryClass = boundaryClass;
    this.disabled = disabled;
    this.options = options;
    this.optionValue = optionValue;
    this.optionLabel = optionLabel;

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
      props: {
        id: this.dataSelectorKey,
        label: this.label,
        outlined: this.parentMDP.outlined,
        dense: this.parentMDP.dense,
        disabled: this.disabled,
        options: this.options,
        optionValue: this.optionValue,
        optionLabel: this.optionLabel,
      },
    };
  }
}
