import MDP from "../../MDP";
import FCellBlankMDP from "../cell/FCellBlankMDP";
import FCellCurrencyMDP from "../cell/FCellCurrencyMDP";
import FCellNameMDP from "../cell/FCellNameMDP";
import FCellStatusMDP from "../cell/FCellStatusMDP";
import FColumnCellMDP from "../FColumnCellMDP";
import FColumnMDP from "../FColumnMDP";
import FTableExpansionMDP from "../FTableExpansionMDP";
import FTableFilterMDP from "../FTableFilterMDP";
import FTabelInfoMDP from "../FTableInfoMDP";
import * as Data from "@/../src-gen/data";
import FCellRouterLinkMDP from "../cell/FCellRouterLinkMDP";

export default class FExpansionFDataTableMDP implements MDP {
  componentName = "FExpansionFDataTable";
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
  expansionComponent: FTableExpansionMDP | undefined;
  hideDefaultFooter?: boolean;
  outlined?: boolean;
  enableSerialNumber?: boolean;
  enablePagination?: boolean;
  groupBySummaryFunction?: (itemList:any) => number
  constructor({
    dataSelectorKey,
    myRefName,
    itemKey,
    disabled = false,
    title,
    enableSearch = true,
    multiSelect = false,
    enableExport = true,
    enableShowHideColumns = true,
    hideDefaultFooter = false,
    outlined = true,
    enableSerialNumber = false,
    enablePagination = true,
    groupBySummaryFunction

  }: {
    dataSelectorKey?: string;
    itemKey?: string;
    disabled?: boolean;
    title?: string;
    enableSearch?: boolean;
    multiSelect?: boolean;
    enableExport?: boolean;
    enableShowHideColumns?: boolean;
    myRefName: string;
    hideDefaultFooter?: boolean;
    outlined?: boolean;
    enableSerialNumber?: boolean;
    enablePagination?: boolean;
    groupBySummaryFunction?: (itemList:any) => any
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
    this.hideDefaultFooter = hideDefaultFooter;
    this.outlined = outlined;
    this.enableSerialNumber = enableSerialNumber;
    this.enablePagination = enablePagination;
    this.groupBySummaryFunction = groupBySummaryFunction;
  }


  addColumn(newField: {
    label: string;
    dataSelectorKey: any;
    align?: string;
    sortable?: boolean;
    columnCellMDP?: FColumnCellMDP;
    hidden?: boolean;
    width?: string;
    enableCopy?: boolean;
    enableGroupBy?: boolean;
  }) {
    this.columnList.push(
      new FColumnMDP(newField)
    );
    return this;
  }

  // Status columns
  addStatusColumn(newField: {
    label: string;
    dataSelectorKey: any;
    align?: string;
    sortable?: boolean;
    hidden?: boolean;
    width?: string;
    outlined?: boolean;
    colorCodeData?: any;
    filterItemList?: any[]
  }) {
    this.columnList.push(
      new FColumnMDP({
        ...newField, columnCellMDP: new FCellStatusMDP({
          outlined: newField.outlined,
          colorCodeData: newField.colorCodeData
        }),
        enableGroupBy: true
      })
    );
    if (newField.filterItemList && newField.filterItemList?.length > 0) {
      this.addFilter({
        label: newField.label,
        dataSelectorKey: newField.dataSelectorKey,
        filterItems: newField.filterItemList
      })
    }
    return this;
  }

  addPsEntryStatusColumn({ label = "status", dataSelectorKey }: { label?: string, dataSelectorKey: string }) {
    this.addStatusColumn({
      label: label,
      dataSelectorKey: dataSelectorKey,
      colorCodeData: Data.Color.PS_ENTRY_STATUS,
      outlined: true,
      filterItemList: Data.ClientFile.PS_ENTRY_STATUS.list(),
    })
    return this;
  }

  addPaymentStatusColumn({
    label = "Payment Status",
    dataSelectorKey, hidden = false }: { label?: string; dataSelectorKey: string; hidden?: boolean }) {
    this.addStatusColumn({
      label: label,
      dataSelectorKey: dataSelectorKey,
      colorCodeData: Data.Color.PAYMENT_STATUS,
      outlined: true,
      filterItemList: Data.ClientFile.PAYMENT_STATUS.list(),
      hidden: hidden
    })
    return this;
  }

  addPsPlanStatusColumn({
    label = "PS Plan Status",
    dataSelectorKey, hidden = false }: { label?: string; dataSelectorKey: string; hidden?: boolean }) {
    this.addStatusColumn({
      label: label,
      dataSelectorKey: dataSelectorKey,
      colorCodeData: Data.Color.PS_PLAN_STATUS,
      outlined: true,
      filterItemList: Data.ClientFile.PS_PLAN_STATUS.list(),
      hidden: hidden
    })
    return this;
  }


  addEMandateStatusColumn({
    label = "EMandate Status",
    dataSelectorKey, hidden = false }: { label?: string; dataSelectorKey: string; hidden?: boolean }) {
    this.addStatusColumn({
      label: label,
      dataSelectorKey: dataSelectorKey,
      colorCodeData: Data.Color.EMANDATE_STATUS,
      outlined: true,
      filterItemList: Data.ClientFile.EMANDATE_STATUS.list(),
      hidden: hidden
    })
    return this;
  }


  addClientFileStatusColumn({
    label = "Client File Status",
    dataSelectorKey, hidden = false }: { label?: string; dataSelectorKey: string; hidden?: boolean }) {
    this.addStatusColumn({
      label: label,
      dataSelectorKey: dataSelectorKey,
      colorCodeData: Data.Color.CLIENT_FILE_STATUS,
      outlined: true,
      filterItemList: Data.ClientFile.CLIENT_FILE_STATUS.list(),
      hidden: hidden,
    })
    return this;
  }

  // Status columns

  addBlankColumn(props: { width: string }) {
    this.columnList.push(
      new FColumnMDP({ label: "", width: props.width, columnCellMDP: new FCellBlankMDP() })
    );
    return this;
  }

  addFilter(newField: {
    label: string;
    dataSelectorKey: any;
    filterItems?: any[];
    itemKey?: string;
    itemText?: string;
    booleanFilter?: boolean;
  }) {
    this.columnFilterList.push(
      new FTableFilterMDP(newField)
    );
    return this;
  }



  addCurrencyColumn(newField: {
    label: string;
    dataSelectorKey: string;
    rounded?: boolean;
    width?: string;
    hidden?: boolean;
  }) {
    const newCellMDP = new FColumnMDP(newField);
    newCellMDP.align = 'right';
    newCellMDP.columnCellMDP = new FCellCurrencyMDP({ rounded: newField.rounded });
    this.columnList.push(
      newCellMDP
    );
    return this;
  }

  addNumberColumn(newField: {
    label: string;
    dataSelectorKey: string;
    hidden?: boolean;
    enableGroupBy?: boolean;
  }) {
    const newCellMDP = new FColumnMDP(newField);
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

  addClientFileNumberColumn({
    label = "Client File Number", dataSelectorKey,
  }: { label?: string; dataSelectorKey: string }) {
    this.addColumn({
      label: label,
      dataSelectorKey: dataSelectorKey,
      columnCellMDP: new FCellRouterLinkMDP({
        routerName: "Root.CFFileRedirect",
        paramName: "clientFileNumber",
        color: "secondary",
      }),
      enableCopy: true,
      width: "13%"
    })

    return this;
  }

  addClientNameColumn({
    label = "Client Name", dataSelectorKey, paramKey = "clientId"
  }: { label?: string; dataSelectorKey: string; paramKey?: string }) {
    this.addColumn({
      label: label,
      dataSelectorKey: dataSelectorKey,
      columnCellMDP: new FCellRouterLinkMDP({
        color: "deep-purple",
        routerName: "Root.Client.ClientDetails",
        paramName: "clientId",
        paramKey: paramKey
      }),
      enableCopy: true
    })

    return this;
  }


  addAction(newAction: FTableActionField) {
    this.actionList.push(newAction);
    return this;
  }

  addInfo(newAction: { label: string, value?: string; infoMDP?: MDP; }) {
    this.infoList.push(new FTabelInfoMDP(newAction));
    return this;
  }

  setExpansionComponent(expansionComponent: FTableExpansionMDP) {
    this.expansionComponent = expansionComponent;
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
        itemKey: this.itemKey,
        disabled: this.disabled,
        title: this.title,
        enableSearch: this.enableSearch,
        multiSelect: this.multiSelect,
        myRefName: this.myRefName,
        infoMetaDataList: this.infoList.map(item => item.getMetaData()),
        enableExport: this.enableExport,
        enableShowHideColumns: this.enableShowHideColumns,
        columnFilterList: this.columnFilterList.map(item => item.getMetaData()),
        expansionComponent: this.expansionComponent?.getMetaData(),
        hideDefaultFooter: this.hideDefaultFooter,
        outlined: this.outlined,
        enableSerialNumber: this.enableSerialNumber,
        enablePagination: this.enablePagination,
        groupBySummaryFunction: this.groupBySummaryFunction
      }
    }
  }
}


export enum ActionType {
  ADD = "ADD",
  DELETE = "DELETE",
  EDIT = "EDIT",
  OTHERS = "OTHERS",
  INFO = "INFO",
  REFRESH = "REFRESH",
}


export interface FTableActionField {
  type: ActionType;
  onClick: (item: any, index?: number) => Promise<any>;
  label: string;
  disabled?: boolean;
  confirmation?: boolean;
  singleSelect?: boolean;
  noSelect?: boolean;
}


