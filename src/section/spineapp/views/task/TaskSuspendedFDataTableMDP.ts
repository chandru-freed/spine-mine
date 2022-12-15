import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FCellTaskMDP from "@/components/generic/table/cell/FCellTaskMDP";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

export default class TaskSuspendedFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "taskSuspendedFDataTableRef",
      enableSearch: true,
      title: "Suspended Task",
      itemKey: 'taskId'
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
        label: "Client",
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
        label: "Resume On",
        dataSelectorKey: "resumeOn",
        columnCellMDP: new FCellDateTimeMDP(),
      })
      .addAction({
        label: "Resume",
        onClick: (item) => this.handleResumeClick(item),
        type: ActionType.OTHERS,
        confirmation: true
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

  handleResumeClick(item: any) {
    return new Promise((resolve) => {
    Action.TaskList.Resume.execute1(item.taskId, output => {
        resolve(true);
    });
    });
  }
}
