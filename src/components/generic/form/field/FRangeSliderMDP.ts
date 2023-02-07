import FFieldMDP from "@/components/generic/form/field/FFieldMDP";
import { FFormChildMDP } from "@/components/generic/form/FFormMDP";

export default class FRangeSliderMDP implements FFieldMDP {
  componentName = "FRangeSlider";
  dataSelectorKey: any;
  label: string;
  type: string;
  rules: string;
  mandatory: boolean;
  parentMDP: FFormChildMDP;
  boundaryClass: string;
  disabled: boolean;
  condition: boolean;
  minValue?:number;
  constructor({
    parentMDP,
    dataSelectorKey='',
    label = '',
    type = "text",
    rules = "",
    mandatory = false,
    boundaryClass = "col-12",
    disabled = false,
    condition = true,
    minValue=0
  }: {
    parentMDP: FFormChildMDP;
    dataSelectorKey?: any;
    label?: string;
    type?: string;
    rules?: any;
    mandatory?: boolean;
    boundaryClass?: string;
    disabled?: boolean;
    condition?: boolean;
    minValue?:number;
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
    this.minValue = minValue;
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
        min: this.minValue
      },
    };
  }
}
