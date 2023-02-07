import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FCellNameMDP from "@/components/generic/table/cell/FCellNameMDP";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";

export default class MISReportsFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any; myRefName: string }) {
    super({
      myRefName: props.myRefName,
      enableSearch: true,
      title: "Account Balance Status",
      itemKey: "taskId",
    });
    this.parent = props.parent;
    this.addColumn({
      label: "Client File Number",
      dataSelectorKey: "clientFileNumber",
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
        dataSelectorKey: "clientName",
        columnCellMDP: new FCellNameMDP({}),
      })
      .addColumn({
        label: "Amount",
        dataSelectorKey: "accountBalance",
        columnCellMDP: new FCellCurrencyMDP({}),
      })
      .addColumn({
        label: "Mobile No",
        dataSelectorKey: "mobile",
        columnCellMDP: new FCellPhoneMDP(),
      });
  }

  handleClientFileClick(item: any) {
    this.parent.gotoFile(item);
  }
}
