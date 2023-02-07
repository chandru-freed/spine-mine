import MDP from "../../MDP";
import { FFormChildMDP } from "../FFormMDP";

export default class FSelectDateFieldMDP implements MDP {
  componentName: string = "FDateSelectField";
  label: string;
  dataSelectorKey: string;
  rules: string;
  mandatory: boolean;
  parentMDP: FFormChildMDP;
  boundaryClass: string;
  disabled: boolean;
  pastDaysDisabled: boolean;
  futureDaysDisabled: boolean;
  dateDisplayFormat: string;
  condition: boolean;
  readonly: boolean;
  onSelect?: (date: any) => void
  constructor({
    parentMDP,
    dataSelectorKey,
    label,
    rules = "",
    mandatory = false,
    boundaryClass = "col-12",
    disabled = false,
    pastDaysDisabled = false,
    futureDaysDisabled = false,
    dateDisplayFormat = "DD/MM/YYYY",
    condition = true,
    readonly = false,
    onSelect
  }: {
    parentMDP: FFormChildMDP;
    dataSelectorKey: string;
    label: string;
    type?: string;
    rules?: string;
    mandatory?: boolean;
    boundaryClass?: string;
    disabled?: boolean;
    pastDaysDisabled?: boolean;
    futureDaysDisabled?: boolean;
    dateDisplayFormat?: string;
    condition?: boolean;
    readonly?: boolean;
    onSelect?: (date: any) => void
  }) {
    this.parentMDP = parentMDP;
    this.dataSelectorKey = dataSelectorKey;
    this.label = label;
    this.rules = rules;
    this.mandatory = mandatory;
    this.boundaryClass = boundaryClass;
    this.disabled = disabled;
    this.pastDaysDisabled = pastDaysDisabled;
    this.futureDaysDisabled = futureDaysDisabled;
    this.dateDisplayFormat = dateDisplayFormat;
    this.condition = condition;
    this.readonly = readonly;
    this.onSelect = onSelect;
  }

  getRules() {
    const required = this.mandatory ? "required" : "";
    return `${required}|${this.rules}`;
  }

  getBoundaryClass() {
    return `${this.boundaryClass} py-0 px-2`;
  }

  isDisabled() {
    return this.disabled || this.readonly;
  }

  getMetaData() {
    return {
      componentName: this.componentName,
      dataSelectorKey: this.dataSelectorKey,
      rules: this.getRules(),
      boundaryClass: this.getBoundaryClass(),
      condition: this.condition,
      props: {
        id: this.dataSelectorKey,
        label: this.label,
        outlined: this.parentMDP.outlined,
        dense: this.parentMDP.dense,
        disabled: this.isDisabled(),
        readonly: this.readonly,
        pastDaysDisabled: this.pastDaysDisabled,
        futureDaysDisabled: this.futureDaysDisabled,
        dateDisplayFormat: this.dateDisplayFormat,
        onSelect: this.onSelect
      },
    };
  }
}
