import FFieldMDP from "./FFieldMDP";
import MDP from "./MDP";

export default class FFormMDP implements MDP {
  componentName = "FForm";

  fieldList: FFieldMDP[] = []
  myRef: string
  

  constructor({ myRef }: { myRef: string }) {
    this.myRef = myRef
  } 

  addField(newField : FFieldMDP) {
    this.fieldList.push(newField)
    return this
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      props: {
        myRef: this.myRef,
        fieldMetaDataList: this.fieldList.map(field => field.getMetaData()),
      },
    };
  }
}


