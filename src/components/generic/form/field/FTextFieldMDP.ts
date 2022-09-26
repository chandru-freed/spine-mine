import FFieldMDP from "@/components/generic/form/field/FFieldMDP";
import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import { readonly } from "vue";

export default class FTextFieldMDP implements FFieldMDP {
  componentName = "FTextField";
  dataSelectorKey: string;
  label: string;
  type: string;
  rules: string;
  mandatory: boolean;
  parentMDP: FFormChildMDP;
  boundaryClass: string;
  disabled: boolean;
  condition: boolean;
  readonly: boolean;
  // defaultValue?: string;

  constructor({
    parentMDP,
    dataSelectorKey,
    label,
    type = "text",
    rules = "",
    mandatory = false,
    boundaryClass = "col-12",
    disabled = false,
    condition = true,
    readonly=false,
    // defaultValue
  }: {
    parentMDP: FFormChildMDP;
    dataSelectorKey: string;
    label: string;
    type?: string;
    rules?: string;
    mandatory?: boolean;
    boundaryClass?: string;
    disabled?: boolean;
    condition?: boolean;
    readonly?: boolean;
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
    this.condition = condition
    this.readonly = readonly;
    // this.defaultValue = defaultValue;
  }

  getRules() {
    const required = this.mandatory ? "required" : "";
    return `${required}|${this.rules}`;
  }

  getBoundaryClass() {
    return `${this.boundaryClass} py-0 px-2`;
  }

  isDisabled() {
    return this.disabled || this.readonly
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
        disabled: this.isDisabled(),
        readonly: this.readonly
        // defaultValue: this.defaultValue
      },
    };
  }
}
