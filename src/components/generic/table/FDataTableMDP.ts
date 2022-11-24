import MDP from "../MDP";
import FColumnCellMDP from "./FColumnCellMDP";
import FColumnMDP from "./FColumnMDP";
export default class FDataTableMDP implements MDP {
  componentName = "FDataTable";
  columnList: FColumnMDP[] = [];
  actionList: any[] = [];
  myRefName: string;

  constructor() {

  }


  addColumn(newField: {
    label: string;
    dataSelectorKey: any ;
    align?: string;
    sortable?: boolean;
    columnCellMDP?: FColumnCellMDP
  }) {
    this.columnList.push(
      new FColumnMDP(newField)
    );
    return this;
  }

  addAction(newAction: FTableActionField) {
    this.actionList.push(newAction);
    return this;
  }

  getMetaData() {
    return {
      componentName: this.componentName,
      props: {
        columnList: this.columnList.map(item => item.getMetaData()),
        actions: this.actionList,

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


export interface FTableActionField {
  type: ActionType;
  onClick: (item: any) => any;
  label: string;
}

