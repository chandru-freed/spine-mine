import { FFormChildMDP, FFormFieldMDP } from "../FFormMDP";
import FMiniFormMDP from "./FMiniFormMDP";

export default class FBudgetMiniFormMDP extends FMiniFormMDP {
  componentName = "FBudgetMiniForm";

  constructor({
    parentMDP,
    id,
    myRef,
    dataSelectorKey,
    disabled = false,
    colWidth = 12,
    rules = "",
    mandatory = false,
    label,
    outlined = false,
  }: {
    parentMDP: FFormChildMDP;
    id: string;
    myRef: string;
    dataSelectorKey: string;
    disabled?: boolean;
    colWidth?: number;
    rules?: string;
    label: string;
    mandatory?: boolean;
    outlined?: boolean;
  }) {
    super({
      parentMDP: parentMDP,
      id: id,
      myRef: myRef,
      dataSelectorKey: dataSelectorKey,
      disabled: disabled,
      colWidth: colWidth,
      rules: rules,
      mandatory: mandatory,
      label: label,
      outlined: outlined,
    });
  }

  // addField(field: FCurrencyFieldMDP) {
  //   this.fieldList.push(field);
  //   return this;
  // }
}
