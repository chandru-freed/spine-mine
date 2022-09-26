import FBtnMDP from "@/components/generic/FBtnMDP";
import FFieldMDP from "@/components/generic/form/field/FFieldMDP";
import MDP from "@/components/generic/MDP";

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
  disabled: boolean;
  colWidth: number;

  constructor({
    myRefName,
    dataSelectorKey,
    disabled = false,
    colWidth = 12
  }: {
    myRefName: string;
    dataSelectorKey?: string;
    disabled?: boolean
    colWidth?: number
  }) {
    this.myRefName = myRefName;
    this.dataSelectorKey = dataSelectorKey;
    this.disabled = disabled
    this.colWidth = colWidth;
  }

  addField(newField: FFieldMDP) {
    this.fieldList.push(newField);
    return this;
  }

  addAction(newAction: FBtnMDP) {
    this.actionList.push(newAction);
    return this;
  }

  getFFormBoundaryClass() {
    return `col-${this.colWidth}`
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
        disabled: this.disabled,
        boundaryClass: this.getFFormBoundaryClass()
      },
    };
  }
}
