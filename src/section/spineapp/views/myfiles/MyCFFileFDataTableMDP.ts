import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellBooleanMDP from "@/components/generic/table/cell/FCellBooleanMDP";
import FCellCopyMDP from "@/components/generic/table/cell/FCellCopyMDP";
import FCellRouterLinkMDP from "@/components/generic/table/cell/FCellRouterLinkMDP";

export default class MyCFFileFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "myCFFileFDataTableRef",
      enableSearch: true,
      title: "My Client files",
      enableInfo: true
    });
    this.parent = props.parent;
    this.addClientFileNumberColumn({
      label: "Client File Number",
      dataSelectorKey: "clientFileNumber",
    })
      .addClientFileStatusColumn({dataSelectorKey: "clientFileStatus.name",})
      .addClientNameColumn({
        label: "Client Name",
        dataSelectorKey: "fullName",
      })
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
        columnCellMDP: new FCellDateTimeMDP(),
      })
      // .addColumn({
      //   label: "Created On",
      //   dataSelectorKey: "dateCreated",
      //   columnCellMDP: new FCellDateTimeMDP(),
      // })
      .addColumn({
        label: "City",
        dataSelectorKey: "city",
      }).addColumn({
        label: "Emandate Active",
        dataSelectorKey: "eMandateActive",
        columnCellMDP: new FCellBooleanMDP({})
      }).addColumn({
        label: "FMSF Paid",
        dataSelectorKey: "firstMSFPaid",
        columnCellMDP: new FCellBooleanMDP({})
      })
      // .addColumn({
      //   label: "State",
      //   dataSelectorKey: "state",
      // })
      .addAction({
        type: ActionType.ADD,
        label: "Add My Client File",
        onClick: (item) => this.addMyClientFile(item),
      })
      .addFilter({
        dataSelectorKey: "eMandateActive",
        // filterItems: Data.ClientFile.CLIENT_FILE_STATUS.list(),
        label: "EMandate Active",
        booleanFilter: true
      });
  }

  handleClientFileClick(item: any) {
    this.parent.gotoFile(item.clientFileNumber);
  }

  addMyClientFile(item: any) {
    return new Promise((res) => {
      // this.parent.showRegisterMyCFForm = true;
      this.parent.openCalculatorPage();
    });
  }

  handleClientClick(item: any) {
    this.parent.gotoClient(item.clientId);
  }
}
