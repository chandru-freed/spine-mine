import FBtnMDP from "./FBtnMDP";
import FFieldMDP from "./FFieldMDP";
import MDP from "./MDP";

export class FFormChildMDP {
  outlined = true;
  dense = true;
}

export default class FFormMDP implements MDP {
  componentName = "FForm";

  fieldList: FFieldMDP[] = [];
  actionList: FBtnMDP[] = [];
  myRefName: string;
  dataSelectorKey: string | undefined;
  disabled: boolean

  constructor({
    myRefName,
    dataSelectorKey,
    disabled = false,
  }: {
    myRefName: string;
    dataSelectorKey?: string;
    disabled?: boolean
  }) {
    this.myRefName = myRefName;
    this.dataSelectorKey = dataSelectorKey;
    this.disabled = disabled
  }

  addField(newField: FFieldMDP) {
    this.fieldList.push(newField);
    return this;
  }

  addAction(newAction: FBtnMDP) {
    this.actionList.push(newAction);
    return this;
  }

  getMetaData(): object {
    return {
      myRefName: this.myRefName,
      componentName: this.componentName,
      dataSelectorKey: this.dataSelectorKey,
      props: {
        myRefName: this.myRefName,
        fieldMetaDataList: this.fieldList.map((field) => field.getMetaData()),
        actionMetaDataList: this.actionList.map((action) =>
          action.getMetaData()
        ),
        disabled: this.disabled
      },
    };
  }
}
