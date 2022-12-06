import MDP from "../MDP";
import FColumnCellMDP from "./FColumnCellMDP";
import FColumnMDP from "./FColumnMDP";
import FTabelInfoMDP from "./FTableInfoMDP";
export default class FDataTableMDP implements MDP {
  componentName = "FDataTable";
  columnList: FColumnMDP[] = [];
  actionList: any[] = [];
  infoList: any[] = [];
  myRefName: string;
  dataSelectorKey: string | undefined;
  itemKey: string | undefined;
  disabled: boolean | undefined;
  title: string | undefined;
  enableSearch: boolean | undefined;
  multiSelect: boolean | undefined;
  constructor({
    dataSelectorKey,
    myRefName,
    itemKey,
    disabled=false,
    title,
    enableSearch=false,
    multiSelect=false,
    
  }:{
    dataSelectorKey?: string;
    itemKey?: string;
    disabled?: boolean;
    title?: string;
    enableSearch?: boolean;
    multiSelect?: boolean;
    myRefName: string;
  }) {
    this.dataSelectorKey = dataSelectorKey;
    this.itemKey = itemKey;
    this.disabled = disabled;
    this.title = title;
    this.enableSearch = enableSearch;
    this.multiSelect = multiSelect;
    this.myRefName = myRefName;
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

  addInfo(newAction: {label: string,value?: string;infoMDP?: MDP;}) {
    this.infoList.push(new FTabelInfoMDP(newAction));
    return this;
  }

  getMetaData() {
    return {
      componentName: this.componentName,
      myRefName: this.myRefName,
      props: {
        columnList: this.columnList.map(item => item.getMetaData()),
        actions: this.actionList,
        dataSelectorKey: this.dataSelectorKey,
        itemKey:this.itemKey,
        disabled: this.disabled,
        title: this.title,
        enableSearch: this.enableSearch,
        multiSelect: this.multiSelect,
        myRefName: this.myRefName,
        infoMetaDataList: this.infoList.map(item => item.getMetaData()),
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
  onClick: (item: any) => Promise<any>;
  label: string;
  disabled?:boolean;
  confirmation?: boolean;
  singleSelect?: boolean;
}

