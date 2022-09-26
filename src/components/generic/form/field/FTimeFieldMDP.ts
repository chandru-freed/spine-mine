import FFieldMDP from "@/components/generic/form/field/FFieldMDP";
import { FFormChildMDP } from "@/components/generic/form/FFormMDP";

export default class FTimeFieldMDP implements FFieldMDP {
  componentName = "FTimeField";
  dataSelectorKey: string;
  label: string;
  type: string;
  rules: string;
  mandatory: boolean;
  parentMDP: FFormChildMDP;
  boundaryClass: string;
  disabled: boolean;
  condition: boolean;
  mask: string;
  unMask: string;
  placeholder: string;
  // defaultValue?: string;

  constructor({
    parentMDP,
    dataSelectorKey,
    label,
    type = "text",
    rules = "timeValidatorwithSeconds",
    mandatory = false,
    boundaryClass = "col-12",
    disabled = false,
    condition = true,
    mask = "##:##:##",
    unMask = "##:##:##",
    placeholder = "HH:MM:ss",
  }: // defaultValue
  {
    parentMDP: FFormChildMDP;
    dataSelectorKey: string;
    label: string;
    type?: string;
    rules?: string;
    mandatory?: boolean;
    boundaryClass?: string;
    disabled?: boolean;
    condition?: boolean;
    mask?: string;
    unMask?: string;
    placeholder?: string;
    // defaultValue?: string
  }) {
    this.parentMDP = parentMDP;
    this.dataSelectorKey = dataSelectorKey;
    this.label = label;
    this.type = type;
    this.rules = rules;
    this.mandatory = mandatory;
    this.boundaryClass = boundaryClass;
    this.disabled = disabled;
    this.condition = condition;
    this.mask = mask;
    this.unMask = unMask;
    this.placeholder = placeholder;
    // this.defaultValue = defaultValue;
  }

  getRules() {
    const required = this.mandatory ? "required" : "";
    return {
      required: this.mandatory || false,
      regex: /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,
    };
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
        mask: this.mask,
        unmask: this.unMask,
        placeholder: this.placeholder,
        // defaultValue: this.defaultValue
      },
    };
  }
}
