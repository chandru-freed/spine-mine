import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
export default class FClientCreditorListMDP implements MDP {
  componentName = "FClientCreditorList";
  parent: any;
  myRefName?: string = "flClientCreditorListRef";

  disabled?: boolean;
  readonly?: boolean;

  constructor({
    parent,
    myRefName,
    disabled,
    readonly,
  }: {
    parent: any;
    myRefName?: string;
    disabled?: boolean;
    readonly?: boolean;
  }) {
    this.parent = parent;
    this.myRefName = myRefName;
    this.disabled = disabled;
    this.readonly = readonly;
  }


  getMetaData(): object {
    return {
      componentName: this.componentName,
      myRefName: this.myRefName,
      props: {
        disabled: this.disabled,
        readonly: this.readonly,
      },
    };
  }
}
