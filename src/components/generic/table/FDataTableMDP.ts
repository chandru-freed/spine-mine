import MDP from "../MDP";
import FCellCurrencyMDP from "./cell/FCellCurrencyMDP";
import FCellNameMDP from "./cell/FCellNameMDP";
import FColumnCellMDP from "./FColumnCellMDP";
import FColumnMDP from "./FColumnMDP";
import FTableFilterMDP from "./FTableFilterMDP";
import FTabelInfoMDP from "./FTableInfoMDP";
export default class FDataTableMDP implements MDP {
  componentName = "FDataTable";
  columnList: FColumnMDP[] = [];
  actionList: any[] = [];
  infoList: any[] = [];
  columnFilterList: FTableFilterMDP[] = [];
  myRefName: string;
  dataSelectorKey: string | undefined;
  itemKey: string | undefined;
  disabled: boolean | undefined;
  title: string | undefined;
  enableSearch: boolean | undefined;
  multiSelect: boolean | undefined;
  enableExport: boolean | undefined;
  enableShowHideColumns: boolean | undefined;
  constructor({
    dataSelectorKey,
    myRefName,
    itemKey,
    disabled=false,
    title,
    enableSearch=false,
    multiSelect=false,
    enableExport=false,
    enableShowHideColumns=false
    
  }:{
    dataSelectorKey?: string;
    itemKey?: string;
    disabled?: boolean;
    title?: string;
    enableSearch?: boolean;
    multiSelect?: boolean;
    enableExport?: boolean;
    enableShowHideColumns?: boolean;
    myRefName: string;
    
  }) {
    this.dataSelectorKey = dataSelectorKey;
    this.itemKey = itemKey;
    this.disabled = disabled;
    this.title = title;
    this.enableSearch = enableSearch;
    this.multiSelect = multiSelect;
    this.myRefName = myRefName;
    this.enableExport = enableExport;
    this.enableShowHideColumns = enableShowHideColumns;
  }


  addColumn(newField: {
    label: string;
    dataSelectorKey: any ;
    align?: string;
    sortable?: boolean;
    columnCellMDP?: FColumnCellMDP;
    hidden?: boolean
  }) {
    this.columnList.push(
      new FColumnMDP(newField)
    );
    return this;
  }

  addFilter(newField: {
    label: string;
    dataSelectorKey: any ;
    filterItems: any[];
    itemKey?: string;
    itemText?: string;
  }) {
    this.columnFilterList.push(
      new FTableFilterMDP(newField)
    );
    return this;
  }



  addCurrencyColumn(newField: {
    label: string;
    dataSelectorKey: string;
    rounded?: boolean
  }) {
    const newCellMDP = new FColumnMDP(newField);
    newCellMDP.align = 'right';
    newCellMDP.columnCellMDP = new FCellCurrencyMDP({rounded: newField.rounded });
    this.columnList.push(
      newCellMDP
    );
    return this;
  }  

  addNumberColumn(newField: {
    label: string;
    dataSelectorKey: string;
  }) {
    const newCellMDP = new FColumnMDP(newField) ;
    newCellMDP.align = 'right';
    this.columnList.push(
      newCellMDP
    );
    return this;
  } 

  addNameColumn(newField: {
    label: string;
    dataSelectorKey: string;
    clientId: string
  }) {
    const newCellMDP = new FColumnMDP(newField);
    newCellMDP.columnCellMDP = new FCellNameMDP({})
    this.columnList.push(
      newCellMDP
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
        enableExport: this.enableExport,
        enableShowHideColumns: this.enableShowHideColumns,
        columnFilterList: this.columnFilterList.map(item => item.getMetaData()),
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
  onClick: (item: any, index?: number) => Promise<any>;
  label: string;
  disabled?:boolean;
  confirmation?: boolean;
  singleSelect?: boolean;
  noSelect?: boolean;
}

