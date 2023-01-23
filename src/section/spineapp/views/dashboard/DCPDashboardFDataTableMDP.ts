import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";

export default class DCPDashboardFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "dcpDashboardFDataTableRef",
      enableSearch: true,
      title: "DCP",
      multiSelect: true,
    });
    this.parent = props.parent;
    this.addColumn({
      label: "Client File Number",
      dataSelectorKey: "clientFileNumber",
      columnCellMDP: new FCellBtnMDP({
        color: "secondary",
        icon: "mdi-file-account",
        onClick: (item) => {
          this.handleClientFileClick(item);
        },
      }),
    })
      .addColumn({
        label: "Client File Status",
        dataSelectorKey: "clientFileStatus.name",
        columnCellMDP: new FCellStatusMDP({
          colorCodeData: Data.Color.CLIENT_FILE_STATUS,
          outlined: true,
        }),
      })
      .addColumn({
        label: "Client Name",
        dataSelectorKey: "fullName",
        columnCellMDP: new FCellBtnMDP({
          color: "deep-purple",
          icon: "mdi-account",
          onClick: (item) => {
            this.handleClientClick(item);
          },
        }),
      })
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
      })
      .addFilter({
        dataSelectorKey: "clientFileStatus.name",
        filterItems: Data.ClientFile.CLIENT_FILE_STATUS.list(),
        label: "Client file Status",
      })
      .addAction({
        label: "Assign",
        onClick: (item) => this.handleAssignClick(item),
        type: ActionType.OTHERS,
      });
  }

  handleClientFileClick(item: any) {
    this.parent.gotoFile(item.clientFileNumber);
  }

  handleClientClick(item: any) {
    this.parent.gotoClient(item.clientId);
  }

  handleAssignClick(item: any) {
    return new Promise((resolve) => {
      this.parent.handleAssignClick(item);
    });
  }
}
