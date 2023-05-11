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
  processType: ProcessType;

  constructor({
    parent,
    myRefName,
    disabled,
    readonly,
    taskRoot,
    processType = ProcessType.Normal
  }: {
    parent: any;
    taskRoot: any;
    myRefName?: string;
    disabled?: boolean;
    readonly?: boolean;
    processType?: ProcessType ;
  }) {
    this.parent = parent;
    this.myRefName = myRefName;
    this.disabled = disabled;
    this.readonly = readonly;
    this.taskRoot = taskRoot;
    this.processType = processType;
  }


  getMetaData(): object {
    return {
      componentName: this.componentName,
      myRefName: this.myRefName,
      props: {
        disabled: this.disabled,
        readonly: this.readonly,
        taskRoot: this.taskRoot,
        processType: this.processType,
        includedCreditorList: this.parent.fiCreditorList
      },
    };
  }
}

export enum ProcessType {
  Normal="Normal",
  Amendment= "Amendment"
}
