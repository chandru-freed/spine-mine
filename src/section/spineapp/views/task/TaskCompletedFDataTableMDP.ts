import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FCellTaskMDP from "@/components/generic/table/cell/FCellTaskMDP";
import FCellTaskStatusMDP from "@/components/generic/table/cell/FCellTaskStatusMDP";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";

export default class TaskCompletedFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "taskCompletedFDataTableRef",
      enableSearch: true,
      title: "My Completed Task",
      itemKey: 'taskId'
    });
    this.parent = props.parent;
    this.addClientFileNumberColumn({dataSelectorKey: "cid",})
      .addClientNameColumn({dataSelectorKey: "displayId",paramKey: "taskInput.clRegistrationDetails.clientId",})
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
        label: "Started Time",
        dataSelectorKey: "startedTime",
        columnCellMDP: new FCellDateTimeMDP(),
      }).addColumn({
        label: "Completed Time",
        dataSelectorKey: "completedTime",
        columnCellMDP: new FCellDateTimeMDP(),
      });
  }

  handleClientFileClick(item: any) {
    this.parent.gotoFile(item);
  }

  addMyClientFile(item: any) {
    return new Promise((res) => {
      this.parent.showRegisterMyCFForm = true;
    });
  }

  handleClientClick(item: any) {
    this.parent.gotoClient(item.taskInput.clRegistrationDetails.clientId);
  }

  handleStartClick(item: any) {
    return new Promise((resolve) => {
      this.parent.pullStartAndMerge('', item);
    });
  }
}
