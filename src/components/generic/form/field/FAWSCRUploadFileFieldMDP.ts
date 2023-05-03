import FFieldMDP from "@/components/generic/form/field/FFieldMDP";
import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import * as Data from "@/../src-gen/data";

export default class FAWSCRUploadFileFieldMDP implements FFieldMDP {
  componentName = "FAWSCRUploadFileField";
  dataSelectorKey: string;
  label: string;
  accept: string;
  rules: string;
  mandatory: boolean;
  parentMDP: FFormChildMDP;
  boundaryClass: string;
  disabled: boolean;
  condition?: boolean;

  constructor({
    parentMDP,
    dataSelectorKey,
    label,
    accept = "*",
    rules = "",
    mandatory = false,
    boundaryClass = "col-12",
    disabled = false,
    condition
  }: {
    parentMDP: FFormChildMDP;
    dataSelectorKey: string;
    label: string;
    accept?: string;
    rules?: string;
    mandatory?: boolean;
    boundaryClass?: string;
    disabled?: boolean;
    condition?: boolean;
  }) {
    this.parentMDP = parentMDP;
    this.dataSelectorKey = dataSelectorKey;
    this.label = label;
    this.accept = accept;
    this.rules = rules;
    this.mandatory = mandatory;
    this.boundaryClass = boundaryClass;
    this.disabled = disabled;
    this.condition = condition;
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
        accept: this.accept,
        outlined: this.parentMDP.outlined,
        dense: this.parentMDP.dense,
        disabled: this.disabled
      },
    };
  }
}
