import FFieldMDP from "./FFieldMDP";
import { FFormChildMDP } from "./../FFormMDP";

export default class FRemoteSelectFieldMDP implements FFieldMDP {
  componentName = "FRemoteSelectField";
  dataSelectorKey: string;
  label: string;
  type: string;
  rules: string;
  mandatory: boolean;
  parentMDP: FFormChildMDP;
  boundaryClass: string
  optionLabel: string|undefined;
  optionValue: string|undefined;
  returnObject: boolean;
  disabled: boolean
  condition: boolean;
  clearable: boolean;
  readonly: boolean;
  multiple: boolean | undefined;
  queryUrl: string;
  constructor({
    parentMDP,
    dataSelectorKey,
    label,
    type = "text",
    rules = "",
    mandatory = false,
    boundaryClass = "col-12",
    disabled = false,
    returnObject=false,
    condition=true,
    optionLabel,
    optionValue,
    clearable=false,
    readonly = false,
    multiple = false,
    queryUrl
  }: {
    parentMDP: FFormChildMDP;
    dataSelectorKey: string;
    label: string;
    type?: string;
    rules?: string;
    mandatory?: boolean;
    boundaryClass?: string
    disabled?: boolean
    condition?:boolean
    returnObject?: boolean
    optionLabel?:string|undefined
    optionValue?:string|undefined
    clearable?: boolean;
    readonly?: boolean;
    multiple?: boolean;
    queryUrl: string
  }) {
    this.parentMDP = parentMDP;
    this.dataSelectorKey = dataSelectorKey;
    this.label = label;
    this.type = type;
    this.rules = rules;
    this.mandatory = mandatory;
    this.boundaryClass = boundaryClass
    this.disabled = disabled
    this.condition = condition;
    this.returnObject = returnObject;
    this.optionLabel = optionLabel;
    this.optionValue = optionValue;
    this.clearable = clearable;
    this.readonly = readonly;
    this.multiple = multiple;
    this.queryUrl = queryUrl;
  }

  getRules() {
    const required = this.mandatory ? "required" : "";
    return `${required}|${this.rules}`;
  }

  getBoundaryClass() {
    return `${this.boundaryClass} py-0 px-2`
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
      props: {
        id: this.dataSelectorKey,
        label: this.label,
        type: this.type,
        outlined: this.parentMDP.outlined,
        dense: this.parentMDP.dense,
        disabled: this.isDisabled(),
        readonly: this.readonly,
        returnObject: this.returnObject,
        itemText: this.optionLabel,
        itemValue: this.optionValue,
        clearable: this.clearable,
        multiple: this.multiple,
        queryUrl: this.queryUrl
      },
    };
  }
}
