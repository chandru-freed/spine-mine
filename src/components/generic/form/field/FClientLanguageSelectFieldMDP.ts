import FFieldMDP from "./FFieldMDP";
import { FFormChildMDP } from "./../FFormMDP";

export default class FClientLanguageSelectFieldMDP implements FFieldMDP {
  componentName = "FClientLanguageSelectField";
  dataSelectorKey: string;
  label: string;
  type: string;
  rules: string;
  mandatory: boolean;
  parentMDP: FFormChildMDP;
  boundaryClass: string
  returnObject: boolean;
  disabled: boolean
  condition: boolean;
  readonly: boolean;
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
    readonly = false,
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
    returnObject?: boolean,
    readonly?: boolean;
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
    this.readonly = readonly;
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
        returnObject: this.returnObject,
        readonly: this.readonly,
      },
    };
  }
}
