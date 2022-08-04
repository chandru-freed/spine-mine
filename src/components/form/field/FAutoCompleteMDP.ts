
import { FFormChildMDP, FFormFieldMDP } from "../FFormMDP";

export default class FAutoCompleteMDP implements FFormFieldMDP {
  // FIXED
  componentName = "FAutoComplete";
  // MANDATORY
  id: string;
  dataSelectorKey: string;
  label: string;
  // OPTIONAL with Default
  rules: string;
  colWidth: number;
  mandatory: boolean;
  disabled: boolean;
  mask: string;
  placeholder: string;
  onSelect: () => void;
  parentMDP: FFormChildMDP;
  options: any[]

  constructor({
    parentMDP,
    id,
    dataSelectorKey,
    label,
    rules = "",
    colWidth = 12,
    mandatory = false,
    disabled = false,
    mask = "",
    placeholder = "",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSelect = () => {},
    options = []
  }: {
    parentMDP: FFormChildMDP;
    id?: string;
    dataSelectorKey: string;
    label: string;
    rules?: string;
    colWidth?: number;
    mandatory?: boolean;
    disabled?: boolean;
    mask?: string;
    placeholder?: string;
    onSelect?: () => void;
    options: any[]
  }) {
    this.parentMDP = parentMDP;
    this.id = !!id ? id : dataSelectorKey;
    this.dataSelectorKey = dataSelectorKey;
    this.label = label;
    this.rules = rules;
    this.colWidth = colWidth;
    this.mandatory = mandatory;
    this.disabled = disabled;
    this.mask = mask;
    this.placeholder = placeholder;
    this.onSelect = onSelect;
    this.options = options
  }

  getBoundaryClass() {
    return `col-${this.colWidth} ${this.parentMDP.padding}`;
  }

  getRules() {
    const mandarotyStr = this.mandatory ? "required" : "";
    return `${mandarotyStr}|${this.rules}`;
  }
  getMetaData(): object {
    return {
      componentName: this.componentName,
      rules: this.getRules(),
      boundaryClass: this.getBoundaryClass(),
      props: {
        key: this.dataSelectorKey,
        name: this.dataSelectorKey, // todo: check the name functionalities
        label: this.label,
        disabled: this.disabled,
        outlined: this.parentMDP.outlined,
        dense: this.parentMDP.dense,
        mask: this.mask,
        onSelect: this.onSelect,
        items: this.options
      },
    };
  }
}
