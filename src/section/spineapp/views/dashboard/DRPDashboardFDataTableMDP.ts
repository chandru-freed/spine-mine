import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellDateTimeEllipsisMDP from "@/components/generic/table/cell/FCellDateTimeEllipsisMDP";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStandardDateTimeMDP from "@/components/generic/table/cell/FCellStandardDateTimeMDP";

export default class DRPDashboardFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "drpDashboardFDataTableRef",
      enableSearch: true,
      title: "DRP",
      multiSelect: true,
      itemKey: "clientFileNumber",
      enableShowHideColumns: true
    });
    this.parent = props.parent;
    this
      .addColumn({
        label: "Created On",
        dataSelectorKey: "createdOn",
        columnCellMDP: new FCellStandardDateTimeMDP(),
      }).addClientFileNumberColumn({
        dataSelectorKey: "clientFileNumber",
      })
      .addClientFileStatusColumn({ dataSelectorKey: "clientFileStatus.name", })
      .addStatusColumn({
        label: "Stage",
        dataSelectorKey: "stage",
        outlined: true,
        filterItemList: Data.Spine.CLIENT_FILE_STAGE.list()
      })
      .addClientNameColumn({
        dataSelectorKey: "fullName",
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
        hidden: true
      })
      .addCurrencyColumn({
        label: "Unsecured Loan Amount",
        dataSelectorKey: "unsecuredLoanAmount",
      }).addNumberColumn({
        label: "Credit Score",
        dataSelectorKey: "creditScore",
        // hidden: true
      }).addColumn({
        label: "Wad",
        dataSelectorKey: "wad",
      })
      .addColumn({
        label: "City",
        dataSelectorKey: "city",
      })
      .addColumn({
        label: "State",
        dataSelectorKey: "state",
        hidden: true
      })
      // .addFilter({
      //   dataSelectorKey: "clientFileStatus.name",
      //   filterItems: Data.ClientFile.CLIENT_FILE_STATUS.list(),
      //   label: "Client file Status"
      // })
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
