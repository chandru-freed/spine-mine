import FBtnMDP from "./FBtnMDP";
import FFieldMDP from "./FFieldMDP";
import MDP from "./MDP";


export class FFormChildMDP {
  outlined = true
  dense = true
}



export default class FFormMDP implements MDP {
  componentName = "FForm";

  fieldList: FFieldMDP[] = [];
  actionList: FBtnMDP[] = [];
  myRefName: string;
  

  constructor({ myRefName }: { myRefName: string }) {
    this.myRefName = myRefName;
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
      props: {
        myRefName: this.myRefName,
        fieldMetaDataList: this.fieldList.map((field) => field.getMetaData()),
        actionMetaDataList: this.actionList.map((action) =>
          action.getMetaData()
        ),
      },
    };
  }
}
