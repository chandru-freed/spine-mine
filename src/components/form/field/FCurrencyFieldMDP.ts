import { MDP } from "@/components/MDP";
import { FFormChildMDP } from "../FFormMDP";
import FNumberFieldMDP from "./FNumberFieldMDP";

export default class FCurrencyFieldMDP extends FNumberFieldMDP {
  componentName = "FCurrencyField";

  constructor({
    parentMDP,
    id,
    dataSelectorKey,
    type = "number",
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
    super({
      parentMDP: parentMDP,
      id: !!id ? id : dataSelectorKey,
      dataSelectorKey: dataSelectorKey,
      type: type,
      label: label,
      rules: rules,
      colWidth: colWidth,
      mandatory: mandatory,
      disabled: disabled,
      mask: mask,
      placeholder: placeholder,
      onChange: onChange,
    });
  }

  
}
