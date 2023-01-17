import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellSLAMDP from "@/components/generic/table/cell/FCellSLAMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FCellTaskMDP from "@/components/generic/table/cell/FCellTaskMDP";
import FCellTaskStatusMDP from "@/components/generic/table/cell/FCellTaskStatusMDP";
import FCellUppercaseMDP from "@/components/generic/table/cell/FCellUppercaseMDP";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";

export default class OPRActiveTaskListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "oprActiveTaskListFDataTableRef",
      enableSearch: true,
      title: "All Active Task",
      itemKey: "taskId",
      multiSelect: true,
    });
    this.parent = props.parent;
    this.addColumn({
      label: "Client File Number",
      dataSelectorKey: "cid",
      columnCellMDP: new FCellBtnMDP({
        color: "secondary",
        icon: "mdi-file-account",
        onClick: (item) => {
          this.handleClientFileClick(item);
        },
      }),
    })
      .addColumn({
        label: "Client Name",
        dataSelectorKey: "displayId",
        columnCellMDP: new FCellBtnMDP({
          color: "deep-purple",
          icon: "mdi-account",
          onClick: (item) => {
            this.handleClientClick(item);
          },
        }),
      })
      .addColumn({
        label: "Task",
        dataSelectorKey: "taskName",
        columnCellMDP: new FCellTaskMDP({
          color: "primary",
        }),
      })
      .addColumn({
        label: "",
        dataSelectorKey: "priority",
        columnCellMDP: new FCellStatusMDP({ outlined: true }),
      })
      .addColumn({
        label: "Status",
        dataSelectorKey: "taskState.name",
        columnCellMDP: new FCellStatusMDP({
          colorCodeData: Data.Color.CLIENT_FILE_STATUS,
          outlined: true,
        }),
      })
      .addColumn({
        label: "allocated To",
        dataSelectorKey: "allocatedTo",
      })
      .addColumn({
        label: "Allocated On",
        dataSelectorKey: "allocatedTime",
        columnCellMDP: new FCellDateTimeMDP(),
      })
      .addAction({
        label: "Assign",
        onClick: (item) => this.handleAssignClick(item),
        type: ActionType.OTHERS,
      }).addAction({
        label: "Reassign",
        onClick: (item) => this.handleReassignClick(item),
        type: ActionType.OTHERS,
      });
  }

  handleClientFileClick(item: any) {
    this.parent.gotoTask(item);
  }

  addMyClientFile(item: any) {
    return new Promise((res) => {
      this.parent.showRegisterMyCFForm = true;
    });
  }

  handleClientClick(item: any) {
    this.parent.gotoClient(item.taskInput.clRegistrationDetails.clientId);
  }

  handleAssignClick(item: any) {
    return new Promise((resolve) => {
      this.parent.handleAssignClick(item);
    });
  }
  handleReassignClick(item: any) {
    return new Promise((resolve) => {
      this.parent.handleReassignClick(item);
    });
  }
}
