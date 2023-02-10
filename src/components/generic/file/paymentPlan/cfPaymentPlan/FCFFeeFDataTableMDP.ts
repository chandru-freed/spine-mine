import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";

export default class FCFFeeFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ title: "MSF Payment Schedule", myRefName: "fFeeFDataTableMDP",itemKey:"msfEntryId" });
    this.parent = parent;
    this.addColumn({
      label: "Draft Date",
      dataSelectorKey: "draftDate",
      columnCellMDP: new FCellDateMDP(),
    })
      .addColumn({
        label: "Amount",
        dataSelectorKey: "amount",
        columnCellMDP: new FCellCurrencyMDP({}),
      }).
      addColumn({
        label: "Status",
        dataSelectorKey: "status",
        columnCellMDP: new FCellStatusMDP({
          colorCodeData: Data.Color.PS_ENTRY_STATUS,
          outlined: true
        }),
      }).addAction({
        label: "Collect",
        onClick: this.collectMSF(),
         type: ActionType.OTHERS
      });
  }

  collectMSF() {
    return (item: any) => {  
      return new Promise(res => {
        this.parent.createCollectMSFThroughCashfree(item);
      })
    }
  }
}
