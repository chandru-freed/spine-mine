import FBtnMDP from "../../FBtnMDP";
import FFieldMDP from "./FFieldMDP";
import MDP from "../../MDP";

export class FFormChildMDP {
  outlined = true;
  dense = true;
}

export default class FBudgetMiniFormMDP implements FFieldMDP {
  componentName = "FBudgetMiniForm";

  fieldList: FFieldMDP[] = [];

  dataSelectorKey: string;
  disabled: boolean;

  label: string;
  rules: string;
  mandatory: boolean;
  boundaryClass: string;
  parentMDP: FFormChildMDP;

  constructor({
    parentMDP,
    dataSelectorKey,
    disabled = false,
    label,
    rules = "",
    mandatory = false,
    boundaryClass = "col-12",
  }: {
    parentMDP: FFormChildMDP;
    dataSelectorKey: string;
    disabled?: boolean;
    label: string;
    rules?: string;
    mandatory?: boolean;
    boundaryClass?: string;
  }) {
    this.parentMDP = parentMDP; // todo : Check not being used
    this.dataSelectorKey = dataSelectorKey;
    this.disabled = disabled;
    this.label = label;
    this.rules = rules;
    this.mandatory = mandatory;
    this.boundaryClass = boundaryClass;
  }

  getRules() {
    const required = this.mandatory ? "required" : "";
    return `${required}|${this.rules}`;
  }

  getBoundaryClass() {
    return `${this.boundaryClass} py-0 px-2`;
  }

  addField(newField: FFieldMDP) {
    this.fieldList.push(newField);
    return this;
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      dataSelectorKey: this.dataSelectorKey,
      rules: this.getRules(),
      boundaryClass: this.getBoundaryClass(),
      props: {
        label: this.label,
        fieldMetaDataList: this.fieldList.map((field) => field.getMetaData()),
        disabled: this.disabled,
      },
    };
  }
}
