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

export default class TaskAssignedToMeFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any, myRefName: string }) {
    super({
      myRefName: props.myRefName,
      enableSearch: true,
      title: "My Assigned Task",
      itemKey:"taskId"
    });
    this.parent = props.parent;
    this.addClientFileNumberColumn({dataSelectorKey: "cid",})
      .addClientNameColumn({ dataSelectorKey: "displayId",paramKey: "taskInput.clRegistrationDetails.clientId"})
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
        dataSelectorKey: "taskState",
        columnCellMDP: new FCellTaskStatusMDP(),
      })
      .addColumn({
        label: "Allocated On",
        dataSelectorKey: "allocatedTime",
        columnCellMDP: new FCellDateTimeMDP(),
      })
      .addAction({
        label:"Suspend",
        onClick:(item) => this.handleSuspendClick(item),
        type: ActionType.OTHERS,
      })
      ;
  }

  

  handleClientFileClick(item: any) {
    this.parent.gotoFile(item);
  }

  handleSuspendClick(item: any) {
    return new Promise(resolve => {
      this.parent.handleSuspendClick(item);
    })
  }


  addMyClientFile(item: any) {
    return new Promise((res) => {
      this.parent.showRegisterMyCFForm = true;
    });
  }

  handleClientClick(item: any) {
    this.parent.gotoClient(item.taskInput.clRegistrationDetails.clientId);
  }
}
