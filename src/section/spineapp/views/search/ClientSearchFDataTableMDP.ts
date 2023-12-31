import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";

export default class ClientSearchFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent?: any }) {
    super({
      title: "Client",
      itemKey: "clientFileId",
      multiSelect: true,
      myRefName: "clientSearchFDataTableRef",
      enableSearch: true,

    });
    this.parent = props.parent;
    this.addClientNameColumn({ dataSelectorKey: "fullName", })
      .addColumn({
        label: "Mobile",
        dataSelectorKey: "mobile",
        columnCellMDP: new FCellPhoneMDP(),
      })
      .addColumn({
        label: "E-mail",
        dataSelectorKey: "emailId",
        columnCellMDP: new FCellEmailMDP(),
      })
      .addColumn({
        label: "City",
        dataSelectorKey: "city",
      })
      .addColumn({
        label: "State",
        dataSelectorKey: "state",
      });
  }

  handleClientFileClick(item: any) {
    this.parent.gotoFile(item.clientFileNumber);
  }

  handleAssignRMClick(itemList: any): Promise<any> {
    return new Promise((resolve) => {
      this.parent.handleAssignRMClick(itemList);
    });
  }

}
