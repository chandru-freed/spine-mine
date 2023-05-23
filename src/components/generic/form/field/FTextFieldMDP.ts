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
  mask: string;
  unmask: string;
  prefix: string;
  hint: string;
  placeholder: string;
  readonly: boolean;
  hidden?: boolean;
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
    mask = "",
    unmask = "",
    prefix = "",
    placeholder = "",
    hint = "",
    readonly = false,
    hidden=false
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
    unmask?: string;
    prefix?: string;
    placeholder?: string;
    hint?: string;
    readonly?: boolean;
    hidden?: boolean;
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
    this.unmask = unmask;
    this.prefix = prefix;
    this.hint = hint;
    this.placeholder = placeholder;
    this.condition = condition;
    this.readonly = readonly;
    this.hidden = hidden;
    // this.defaultValue = defaultValue;
  }

  getRules() {
    const required = this.mandatory ? "required" : "";
    return `${required}|${this.rules}`;
  }

  getBoundaryClass() {
    return `${this.boundaryClass} py-0 px-2`;
  }

  getMaxLength() {
    return this.mask ? this.mask.length : undefined;
  }
  isDisabled() {
    return this.disabled || this.readonly;
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      dataSelectorKey: this.dataSelectorKey,
      rules: this.getRules(),
      boundaryClass: this.getBoundaryClass(),
      condition: this.condition,
      hidden: this.hidden,
      props: {
        id: this.dataSelectorKey,
        label: this.label,
        type: this.type,
        outlined: this.parentMDP.outlined,
        dense: this.parentMDP.dense,
        unmask: this.unmask,
        mask: this.mask,
        maxlength: this.getMaxLength(),
        prefix: this.prefix,
        placeholder: this.placeholder,
        hint: this.hint,
        disabled: this.isDisabled(),
        readonly: this.readonly,
        // defaultValue: this.defaultValue
      },
    };
  }
}
