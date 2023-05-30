import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";

export default class UnAssignedCFListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent?: any }) {
    super({
      title: "Client File List",
      itemKey: "clientFileId",
      multiSelect: true,
      myRefName: "unAssignedCFListFDataTableRef",
      enableSearch: true,

    });
    this.parent = props.parent;
    this.addClientFileNumberColumn({ dataSelectorKey: "clientFileNumber", })
      .addClientFileStatusColumn({ dataSelectorKey: "clientFileStatus.name", })
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
        label: "City",
        dataSelectorKey: "city",
        hidden: true
      })
      .addColumn({
        label: "State",
        dataSelectorKey: "state",
        hidden: true
      }).addColumn({
        label: "Assigned RM",
        dataSelectorKey: "assignedRM",
      })
      .addColumn({
        label: "Assigned Sales Rep",
        dataSelectorKey: "assignedSalesRep",
      })
      .addBooleanColumn({
        label: "EMandate Active",
        dataSelectorKey:"eMandateActive"
      })
      .addAction({
        label: "Assign RM",
        onClick: (item) => this.handleAssignRMClick(item),
        type: ActionType.OTHERS,
        disabled: this.parent.isSalesLead || this.parent.isSalesRep
      })
  }

  handleClientFileClick(item: any) {
    this.parent.gotoFile(item.clientFileNumber);
  }

  handleAssignRMClick(itemList: any): Promise<any> {
    return new Promise((resolve) => {
      this.parent.handleAssignRMClick(itemList);
    });
  }

  handleClientClick(item: any) {
    this.parent.gotoClient(item.clientId);
  }
}
