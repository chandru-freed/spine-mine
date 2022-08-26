import FFieldMDP from "./FFieldMDP";
import { FFormChildMDP } from "./../FFormMDP";

export default class FSelectFieldMDP implements FFieldMDP {
  componentName = "FSelectFooField";
  dataSelectorKey: string;
  label: string;
  type: string;
  rules: string;
  mandatory: boolean;
  parentMDP: FFormChildMDP;
  boundaryClass: string;
  items: any[];
  disabled: boolean;
  returnObject: boolean;
  itemText: string|undefined;
  itemValue: string|undefined;

  constructor({
    parentMDP,
    dataSelectorKey,
    label,
    type = "text",
    rules = "",
    mandatory = false,
    boundaryClass = "col-12",
    items = [],
    disabled = false,
    returnObject=false,
    itemText,
    itemValue
  }: {
    parentMDP: FFormChildMDP;
    dataSelectorKey: string;
    label: string;
    type?: string;
    rules?: string;
    mandatory?: boolean;
    boundaryClass?: string
    items: any[],
    disabled?: boolean
    returnObject?: boolean
    itemText?:string|undefined
    itemValue?:string|undefined
  }) {
    this.parentMDP = parentMDP;
    this.dataSelectorKey = dataSelectorKey;
    this.label = label;
    this.type = type;
    this.rules = rules;
    this.mandatory = mandatory;
    this.boundaryClass = boundaryClass;
    this.items = items;
    this.disabled = disabled;
    this.returnObject = returnObject;
    this.itemValue = itemValue;
    this.itemText = itemText;
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
      props: {
        id: this.dataSelectorKey,
        label: this.label,
        type: this.type,
        outlined: this.parentMDP.outlined,
        dense: this.parentMDP.dense,
        items: this.items,
        disabled: this.disabled,
        returnObject: this.returnObject,
        itemValue: this.itemValue,
        itemText: this.itemText,
      },
    };
  }
}
