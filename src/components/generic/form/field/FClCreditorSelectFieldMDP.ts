import FFieldMDP from "./FFieldMDP";
import { FFormChildMDP } from "../FFormMDP";

export default class FClCreditorSelectFieldMDP implements FFieldMDP {
  componentName = "FClCreditorSelectField";
  dataSelectorKey: string;
  label: string;
  type: string;
  rules: string;
  mandatory: boolean;
  parentMDP: FFormChildMDP;
  boundaryClass: string
  optionLabel: string = "creditorSearchStr";
  optionValue: string = "clCreditorId";
  returnObject: boolean;
  disabled: boolean
  condition: boolean;
  onSelect: (details: any) => void | undefined;
  constructor({
    parentMDP,
    dataSelectorKey,
    label,
    type = "text",
    rules = "",
    mandatory = false,
    boundaryClass = "col-12",
    disabled = false,
    returnObject=true,
    condition=true,
    onSelect,
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
    onSelect?: any;
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
    this.onSelect = onSelect;
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
        returnObject: this.returnObject,
        itemText: this.optionLabel,
        itemValue: this.optionValue,
        onSelect: this.onSelect,
        clearable: true
      },
    };
  }
}
