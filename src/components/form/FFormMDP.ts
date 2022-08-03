import { MDP } from "@/components/MDP";
import FBtnMDP from "../FBtnMDP";

export class FFormChildMDP {
  dense: boolean;
  outlined: boolean;
  padding: string;

  constructor({
    dense = true,
    outlined = true,
    padding = "px-2",
  }: {
    dense?: boolean;
    outlined?: boolean;
    padding?: string;
  }) {
    this.dense = dense;
    this.outlined = outlined;
    this.padding = padding;
  }
}

export default class FFormMDP implements MDP {
  componentName = "FForm";

  id: string;
  myRef: string;

  dataSelectorKey?: string;
  disabled: boolean;
  fieldList: FFormFieldMDP[] = [];
  actionList: FBtnMDP[] = [];

  constructor({
    id,
    myRef,
    dataSelectorKey,
    disabled = false,
  }: {
    id: string;
    myRef: string;
    dataSelectorKey?: string;
    disabled?: boolean;
  }) {
    this.id = id;
    this.myRef = myRef;
    this.dataSelectorKey = dataSelectorKey;
    this.disabled = disabled;
  }

  addField(field: FFormFieldMDP) {
    this.fieldList.push(field);
    return this;
  }

  addAction(action: FBtnMDP) {
    this.actionList.push(action);
    return this;
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      id: this.id,
      myRef: this.myRef,
      dataSelectorKey: this.dataSelectorKey,
      props: {
        id: this.id,
        myRef: this.myRef,
        name: this.myRef,
        fieldList: this.fieldList.map((comp: FFormFieldMDP) =>
          comp.getMetaData()
        ),
        actionList: this.actionList.map((comp: FBtnMDP) =>
          comp.getMetaData()
        ),
        disabled: this.disabled,
      },
    };
  }
}

export interface FFormFieldMDP extends MDP {
  dataSelectorKey: string;
  rules: string;
  label: string;
}
