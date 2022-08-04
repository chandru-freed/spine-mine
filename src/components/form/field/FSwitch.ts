
import { FFormChildMDP, FFormFieldMDP } from "../FFormMDP";

export default class FSwitchMDP implements FFormFieldMDP {
  // FIXED
  componentName = "FSwitch";
  type: string; // = "text";
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
  onChange: () => void;
  parentMDP: FFormChildMDP;

  constructor({
    parentMDP,
    id,
    dataSelectorKey,
    type = "text",
    label,
    rules = "",
    colWidth = 12,
    mandatory = false,
    disabled = false,
    mask = "",
    placeholder = "",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
  }: {
    parentMDP: FFormChildMDP;
    id?: string;
    dataSelectorKey: string;
    type?: string;
    label: string;
    rules?: string;
    colWidth?: number;
    mandatory?: boolean;
    disabled?: boolean;
    mask?: string;
    placeholder?: string;
    onChange?: () => void;
  }) {
    this.parentMDP = parentMDP;
    this.id = !!id ? id : dataSelectorKey;
    this.dataSelectorKey = dataSelectorKey;
    this.type = type;
    this.label = label;
    this.rules = rules;
    this.colWidth = colWidth;
    this.mandatory = mandatory;
    this.disabled = disabled;
    this.mask = mask;
    this.placeholder = placeholder;
    this.onChange = onChange;
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
        type: this.type,
        name: this.dataSelectorKey, // todo: check the name functionalities
        label: this.label,
        disabled: this.disabled,
        outlined: this.parentMDP.outlined,
        dense: this.parentMDP.dense,
        mask: this.mask,
        onChange: this.onChange,
      },
    };
  }
}
