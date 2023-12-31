import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FCellDateTimeEllipsisMDP from "@/components/generic/table/cell/FCellDateTimeEllipsisMDP";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FCellStandardDateTimeMDP from "@/components/generic/table/cell/FCellStandardDateTimeMDP";

export default class CallBackDashboardFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "callBackDashboardFDataTableRef",
      enableSearch: true,
      title: "Callback Request",
      multiSelect: true,
      itemKey: "clientFileNumber",
      enableShowHideColumns: true
    });
    this.parent = props.parent;
    this
      .addColumn({
        label: "Requested On",
        dataSelectorKey: "dateTimeRequested",
        columnCellMDP: new FCellStandardDateTimeMDP(),
      }).addClientFileNumberColumn({ dataSelectorKey: "clientFileNumber" })
      .addStatusColumn({
        label: "Stage",
        dataSelectorKey: "callBackStage",
        outlined: true,
        filterItemList: Data.Spine.CLIENT_FILE_STAGE.list()
      })
      .addClientNameColumn({ dataSelectorKey: "fullName" })
      .addColumn({
        label: "Sales Rep",
        dataSelectorKey: "assignedSalesRep",
        enableGroupBy: true
      })
      .addColumn({
        label: "RM",
        dataSelectorKey: "assignedRM",
        enableGroupBy: true
      })
      .addColumn({
        label: "Phone",
        dataSelectorKey: "phoneNumber",
        columnCellMDP: new FCellPhoneMDP()
      })
      .addAction({
        label:"Add Note",
        onClick: this.handleAdNoteclick(),
        type: ActionType.OTHERS,
        singleSelect: true
      })
  }

  handleClientFileClick(item: any) {
    this.parent.gotoFile(item.clientFileNumber);
  }

  handleAdNoteclick() {
    return (item: any) => {
      return new Promise(res => {
        this.parent.handleAdNoteclick(item)
      })
    }
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
