import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FCellTaskMDP from "@/components/generic/table/cell/FCellTaskMDP";
import FCellTaskStatusMDP from "@/components/generic/table/cell/FCellTaskStatusMDP";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";

export default class MISReportsFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any; myRefName: string }) {
    super({
      myRefName: props.myRefName,
      enableSearch: true,
      title: "Upcoming Payment List",
      itemKey: "taskId",
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
        label: "Amount",
        dataSelectorKey: "spaAmount",
        columnCellMDP: new FCellTaskMDP({
          color: "primary",
        }),
      })
      .addColumn({
        label: "Payment Date",
        dataSelectorKey: "spaPaymentDate",
        columnCellMDP: new FCellDateTimeMDP(),
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
      });
  }

  handleClientFileClick(item: any) {
    this.parent.gotoFile(item);
  }

  handleSuspendClick(item: any) {
    return new Promise((resolve) => {
      console.log(item);
      this.parent.handleSuspendClick(item);
    });
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
