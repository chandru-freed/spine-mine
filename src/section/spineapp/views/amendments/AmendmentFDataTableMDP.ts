import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellCopyMDP from "@/components/generic/table/cell/FCellCopyMDP";
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
    this.addClientFileNumberColumn({dataSelectorKey: "clientFileNumber"})
      .addColumn({
        label: "Amendment Token",
        dataSelectorKey: "amndToken",
        columnCellMDP: new FCellCopyMDP({
          dataSelectorKeyToCopy:"amendmentLink",
          tooltipText:"Click here to copy the amendment link"
        }),
      })
      .addColumn({
        label: "Created Date",
        dataSelectorKey: "createdOn",
        columnCellMDP: new FCellDateTimeMDP(),
      })
      ;
  }

  handleCancelClick(item: any) {
    this.parent.gotoFile(item.amndToken);
  }
}
