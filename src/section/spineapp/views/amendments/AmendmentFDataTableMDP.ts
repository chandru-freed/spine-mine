import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FCellTextMDP from "@/components/generic/table/cell/FCellTextMDP";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";

export default class AmendmentsFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "amendmentsFDataTableRef",
      enableSearch: true,
      title: "Active Amendments",
    });
    this.parent = props.parent;
    this.addColumn({
      label: "Client File Number",
      dataSelectorKey: "clientFileNumber",
      columnCellMDP: new FCellStatusMDP({}),
    })
      .addColumn({
        label: "Amendment Token",
        dataSelectorKey: "amndToken",
        columnCellMDP: new FCellTextMDP({}),
      })
      .addColumn({
        label: "Created Date",
        dataSelectorKey: "createdOn",
        columnCellMDP: new FCellDateTimeMDP(),
      })
      .addColumn({
        label: "Action",
        dataSelectorKey: "amndToken",
        columnCellMDP: new FCellBtnMDP({
          color: "deep-purple",
          icon: "mdi-account",
          onClick: (item) => {
            this.handleCancelClick(item);
          },
        }),
      });
  }

  handleCancelClick(item: any) {
    this.parent.gotoFile(item.amndToken);
  }
}
