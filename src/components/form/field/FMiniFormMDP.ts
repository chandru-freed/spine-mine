import { FFormChildMDP, FFormFieldMDP } from "../FFormMDP";

export default class FMiniFormMDP implements FFormFieldMDP {
  componentName = "FMiniForm";

  id: string;
  myRef: string;

  dataSelectorKey: string;
  disabled: boolean;
  fieldList: FFormFieldMDP[] = [];
  colWidth: number;
  parentMDP: FFormChildMDP;
  rules: string;
  mandatory: boolean;
  label: string;
  outlined: boolean

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
    outlined = true,
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
    outlined?: boolean
  }) {
    this.parentMDP = parentMDP;
    this.id = id;
    this.myRef = myRef;
    this.dataSelectorKey = dataSelectorKey;
    this.disabled = disabled;
    this.colWidth = colWidth;
    this.rules = rules;
    this.mandatory = mandatory;
    this.label = label;
    this.outlined = outlined
  }

  addField(field: FFormFieldMDP) {
    this.fieldList.push(field);
    return this;
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
      id: this.id,
      myRef: this.myRef,
      boundaryClass: this.getBoundaryClass(),
      rules: this.getRules(),
      props: {
        key: this.dataSelectorKey,
        id: this.id,
        myRef: this.myRef,
        name: this.myRef,
        label: this.label,
        fieldList: this.fieldList.map((comp: FFormFieldMDP) =>
          comp.getMetaData()
        ),
        disabled: this.disabled,
        outlined: this.outlined
      },
    };
  }
}
