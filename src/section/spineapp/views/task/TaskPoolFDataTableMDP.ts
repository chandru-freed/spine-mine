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

export default class TaskPoolFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "taskPoolFDataTableRef",
      enableSearch: true,
      title: "Task To Be Pulled",
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
        label: "Ready On",
        dataSelectorKey: "readyTime",
        columnCellMDP: new FCellDateTimeMDP(),
      })
      .addAction({
        label: "Start",
        onClick: (item) => this.handleStartClick(item),
        type: ActionType.OTHERS,
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
