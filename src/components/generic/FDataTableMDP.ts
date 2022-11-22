import MDP from "./MDP";
export default class FDataTableMDP implements MDP {
    componentName = "FDataTable";
    fieldList: any[] = [];
    actionList: any[] = [];
    myRefName: string;
    dataSelectorKey: string;
    constructor({dataSelectorKey}:{dataSelectorKey: string}) {
        this.dataSelectorKey = dataSelectorKey;
    }


  addField(newField: any) {
    this.fieldList.push(newField);
    return this;
  }

  addAction(newAction: any) {
    this.actionList.push(newAction);
    return this;
  }

    getMetaData() {
        return {
            componentName: this.componentName,
            props: {
                headers: this.fieldList,
                actions:this.actionList,
                dataSelectorKey: this.dataSelectorKey,
            }
        }
    }
}


export enum ActionType {
    ADD = "ADD",
    DELETE = "DELETE",
    EDIT = "EDIT",
    OTHERS = "OTHERS",
  }
