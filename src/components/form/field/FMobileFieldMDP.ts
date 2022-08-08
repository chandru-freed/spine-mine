import { MDP } from "@/components/MDP";
import { FFormChildMDP } from "../FFormMDP";
import FTextFieldMDP from "./FTextFieldMDP";

export default class FMobileFieldMDP extends FTextFieldMDP {
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
    mask = "##########",
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
      id: (!!id) ? id : dataSelectorKey,
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
