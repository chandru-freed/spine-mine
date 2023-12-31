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
      title: "All Tasks",
      itemKey: "taskId",
      multiSelect: true,
    });
    this.parent = props.parent;
    this.addClientFileNumberColumn({ dataSelectorKey: "cid", })
      .addClientNameColumn({
        dataSelectorKey: "displayId",
        paramKey: "taskInput.clRegistrationDetails.clientId",
      })
      .addColumn({
        label: "Task",
        dataSelectorKey: "taskName",
        columnCellMDP: new FCellTaskMDP({
          color: "primary",
        }),
        enableCopy: true
      })
      .addStatusColumn({
        label: "",
        dataSelectorKey: "priority",
        outlined: true
      })
      .addClientFileStatusColumn({ label: "Status", dataSelectorKey: "taskState.name", })
      .addColumn({
        label: "allocated To",
        dataSelectorKey: "allocatedTo",
        enableGroupBy: true
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

  // addMyClientFile(item: any) {
  //   return new Promise((res) => {
  //     this.parent.showRegisterMyCFForm = true;
  //   });
  // }

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
