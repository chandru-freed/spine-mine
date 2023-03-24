import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

export default class FCFAFeeFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ title: "MSF Payment Schedule", myRefName: "fFeeFDataTableRef", itemKey:"msfEntryId" });
    this.parent = parent;
    this.addColumn({
      label: "Draft Date",
      dataSelectorKey: "draftDate",
      columnCellMDP: new FCellDateMDP(),
    })
    //   .addColumn({
    //     label: "Fee Code",
    //     dataSelectorKey: "feeCode",
    //     columnCellMDP: new FCellCurrencyMDP({}),
    //   })
      .addColumn({
        label: "Amount",
        dataSelectorKey: "amount",
        columnCellMDP: new FCellCurrencyMDP({}),
      })
    //   .addColumn({
    //     label: "Tax Amount",
    //     dataSelectorKey: "taxAmount",
    //     columnCellMDP: new FCellCurrencyMDP({}),
    //   })
    //   .addColumn({
    //     label: "Total Amount",
    //     dataSelectorKey: "totalAmount",
    //     columnCellMDP: new FCellStatusMDP({}),
    //   })
      .addPsEntryStatusColumn({dataSelectorKey: "status"})

      .addAction({
        label: "Modify MSF Draft Day",
        onClick: () => this.handleSetMSFDraftClick(),
        type: ActionType.OTHERS,
        noSelect: true
      })
      .addAction({
        label: "Change MSF Draft Date",
        onClick: this.changeDraftDate(),
        type: ActionType.OTHERS,
        singleSelect: true
      })
      .addAction({
        label: "Mark Paid",
        onClick: (item) => this.handleMarkPaid(item),
        type: ActionType.OTHERS,
        singleSelect: true
      });
  }


  handleMarkPaid(item: any) {
    return new Promise((resolve) => {
      console.log(item)
      Action.Spine.MSFMarkPaid.execute1(item.msfEntryId, output => {
        resolve(true)
      })
      // this.parent.showAddPsEntryForm = true;
    });
  }

  handleSetMSFDraftClick() {
    return new Promise((resolve) => {
      this.parent.showSetMsfDraftDate = true;
    });
  }

  changeDraftDate() {
    return (item: any) => {
      return new Promise(( res) => {
        console.log(item)
        this.parent.changeMSFDraftDateInput.msfScheduleEntryId = item.msfEntryId;
        this.parent.changeMSFDraftDateInput.newMsfDraftDate = item.draftDate;
        this.parent.showChangeMSFDraftDate = true;
      })
    }
  }
}
