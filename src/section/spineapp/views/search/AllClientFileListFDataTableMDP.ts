import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";

export default class AllClientFileListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent?: any }) {
    super({
      title: "Client File List",
      enableSearch: true,
      myRefName: "allClientFileListFDataTableRef",
      enableShowHideColumns: true,
    });
    this.parent = props.parent;
    this.addColumn({
      label: "Client File Number",
      dataSelectorKey: "clientFileNumber",
      columnCellMDP: new FCellBtnMDP({
        color: "secondary",
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
      })
      .addColumn({
        label: "State",
        dataSelectorKey: "state",
        hidden: true
      }).addFilter({
        dataSelectorKey: "clientFileStatus.name",
        filterItems: Data.ClientFile.CLIENT_FILE_STATUS.list(),
        label: "Client file Status"
      });
  }

  handleClientFileClick(item: any) {
    this.parent.gotoFile(item.clientFileNumber);
  }

  handleClientClick(item: any) {
    this.parent.gotoClient(item.clientId);
  }
}