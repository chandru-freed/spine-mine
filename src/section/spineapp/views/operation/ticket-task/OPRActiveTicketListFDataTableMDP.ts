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

export default class OPRActiveTicketListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "oprActiveTicketListFDataTableRef",
      enableSearch: true,
      title: "All Tickets",
      itemKey: "taskId",
      multiSelect: true,
    });
    this.parent = props.parent;
    this.addTicketNumberColumn({
      label: "Ticket Number",
      dataSelectorKey: "cid",
      paramKey:"taskId"
    })
      .addColumn({
        label: "Subject",
        dataSelectorKey: "displayId",
        columnCellMDP: new FCellUppercaseMDP()
      }).addColumn({
        label: "SLA",
        dataSelectorKey: "sla",
        columnCellMDP: new FCellSLAMDP(),
      })
      .addColumn({
        label: "priority",
        dataSelectorKey: "priority",
        columnCellMDP: new FCellStatusMDP({ outlined: true }),
      })
      .addColumn({
        label: "Raised By",
        dataSelectorKey: "raisedBy",
      })
      .addColumn({
        label: "Allocated To",
        dataSelectorKey: "allocatedTo",
      })
      .addColumn({
        label: "Allocated On",
        dataSelectorKey: "allocatedTime",
        columnCellMDP: new FCellDateTimeMDP(),
      }).addAction({
        label: "Reassign",
        onClick: (item) => this.handleReassignClick(item),
        type: ActionType.OTHERS,
      });;
  }

  handleClientFileClick(item: any) {
    this.parent.gotoTask(item);
  }

  handleClientClick(item: any) {
    this.parent.gotoClient(item.taskInput.clRegistrationDetails.clientId);
  }

  handleReassignClick(item: any) {
    return new Promise((resolve) => {
      this.parent.handleReassignClick(item);
    });
  }
}
