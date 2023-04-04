import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";
import FCellDateTimeEllipsisMDP from "@/components/generic/table/cell/FCellDateTimeEllipsisMDP";
import FCellBooleanMDP from "@/components/generic/table/cell/FCellBooleanMDP";

export default class AllClientFileListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent?: any }) {
    super({
      title: "Client File List",
      enableSearch: true,
      myRefName: "allClientFileListFDataTableRef",
      enableShowHideColumns: true,
      itemKey: "clientFileId",
      multiSelect: true,
    });
    this.parent = props.parent;
    this.addClientFileNumberColumn({ dataSelectorKey: "clientFileNumber", })
      .addClientFileStatusColumn({dataSelectorKey: "clientFileStatus.name",})
      .addClientNameColumn({ dataSelectorKey: "fullName", })
      .addColumn({
        label: "Mobile",
        dataSelectorKey: "mobile",
        columnCellMDP: new FCellPhoneMDP(),
        // enableCopy: true
      })
      .addColumn({
        label: "E-mail",
        dataSelectorKey: "emailId",
        columnCellMDP: new FCellEmailMDP(),
        // enableCopy: true
      })
      .addColumn({
        label: "Created On",
        dataSelectorKey: "dateCreated",
        columnCellMDP: new FCellDateTimeEllipsisMDP(),
      })
      .addColumn({
        label: "Assigned RM",
        dataSelectorKey: "assignedRM",
      })
      .addColumn({
        label: "Assigned Sales Rep",
        dataSelectorKey: "assignedSalesRep",
      })
      .addColumn({
        label: "City",
        dataSelectorKey: "city",
        hidden: true,
      })
      .addColumn({
        label: "State",
        dataSelectorKey: "state",
        hidden: true,
      })
      .addColumn({
        label: "Emandate Active",
        dataSelectorKey: "eMandateActive",
        columnCellMDP: new FCellBooleanMDP({}),
      })
      .addAction({
        label: "Assign RM",
        onClick: (item) => this.handleAssignRMClick(item),
        type: ActionType.OTHERS,
        disabled: this.parent.isSalesLead || this.parent.isSalesRep
      })
      ;
  }

  handleClientFileClick(item: any) {
    this.parent.gotoFile(item.clientFileNumber);
  }

  handleClientClick(item: any) {
    this.parent.gotoClient(item.clientId);
  }


  handleAssignRMClick(itemList: any): Promise<any> {
    return new Promise((resolve) => {
      this.parent.handleAssignRMClick(itemList);
    });
  }
}
