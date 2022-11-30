import MDP from "../MDP";
import FColumnCellMDP from "./FColumnCellMDP";
import FColumnMDP from "./FColumnMDP";
export default class FDataTableMDP implements MDP {
  componentName = "FDataTable";
  columnList: FColumnMDP[] = [];
  actionList: any[] = [];
  myRefName: string;
  dataSelectorKey: string | undefined;
  itemKey: string | undefined;
  disabled: boolean | undefined;
  title: string | undefined;
  constructor({
    dataSelectorKey,
    itemKey,
    disabled=false,
    title
  }:{
    dataSelectorKey?: string;
    itemKey?: string;
    disabled?: boolean;
    title?: string
  }) {
    this.dataSelectorKey = dataSelectorKey;
    this.itemKey = itemKey;
    this.disabled = disabled;
    this.title = title;
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
        dataSelectorKey: this.dataSelectorKey,
        itemKey:this.itemKey,
        disabled: this.disabled,
        title: this.title
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
  disabled?:boolean;
}

