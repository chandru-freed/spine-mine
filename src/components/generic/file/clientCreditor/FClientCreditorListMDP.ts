import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
export default class FClientCreditorListMDP implements MDP {
  componentName = "FClientCreditorList";
  parent: any;
  myRefName?: string = "flClientCreditorListRef";

  disabled?: boolean;
  readonly?: boolean;
  taskRoot: any;
  creditorType: CreditorType;

  constructor({
    parent,
    myRefName,
    disabled,
    readonly,
    taskRoot,
    creditorType = CreditorType.Normal
  }: {
    parent: any;
    taskRoot: any;
    myRefName?: string;
    disabled?: boolean;
    readonly?: boolean;
    creditorType?: CreditorType ;
  }) {
    this.parent = parent;
    this.myRefName = myRefName;
    this.disabled = disabled;
    this.readonly = readonly;
    this.taskRoot = taskRoot;
    this.creditorType = creditorType;
  }


  getMetaData(): object {
    return {
      componentName: this.componentName,
      myRefName: this.myRefName,
      props: {
        disabled: this.disabled,
        readonly: this.readonly,
        taskRoot: this.taskRoot,
        creditorType: this.creditorType,
        includedCreditorList: this.parent.fiCreditorList
      },
    };
  }
}

export enum CreditorType {
  Normal="Normal",
  Amendment= "Amendment"
}
