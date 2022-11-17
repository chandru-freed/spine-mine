import FFieldMDP from "@/components/generic/form/field/FFieldMDP";
import { FFormChildMDP } from "@/components/generic/form/FFormMDP";

export default class FCFAWSUploadFileFieldMDP implements FFieldMDP {
  componentName = "FCFAWSUploadFileField";
  dataSelectorKey: string;
  label: string;
  accept: string;
  rules: string;
  mandatory: boolean;
  parentMDP: FFormChildMDP;
  boundaryClass: string;
  disabled: boolean;

  constructor({
    parentMDP,
    dataSelectorKey,
    label,
    accept = "*",
    rules = "",
    mandatory = false,
    boundaryClass = "col-12",
    disabled = false,
  }: {
    parentMDP: FFormChildMDP;
    dataSelectorKey: string;
    label: string;
    accept?: string;
    rules?: string;
    mandatory?: boolean;
    boundaryClass?: string;
    disabled?: boolean;
  }) {
    this.parentMDP = parentMDP;
    this.dataSelectorKey = dataSelectorKey;
    this.label = label;
    this.accept = accept;
    this.rules = rules;
    this.mandatory = mandatory;
    this.boundaryClass = boundaryClass;
    this.disabled = disabled;
  }

  getRules() {
    const required = this.mandatory ? "document_required" : "";
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
      props: {
        id: this.dataSelectorKey,
        label: this.label,
        accept: this.accept,
        outlined: this.parentMDP.outlined,
        dense: this.parentMDP.dense,
        disabled: this.disabled,
      },
    };
  }
}
