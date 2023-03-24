import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FCellCopyMDP from "@/components/generic/table/cell/FCellCopyMDP";

export default class FCFFeeFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ title: "MSF Payment Schedule", myRefName: "fFeeFDataTableMDP", itemKey: "msfEntryId" });
    this.parent = parent;
    this.addColumn({
      label: "Draft Date",
      dataSelectorKey: "draftDate",
      columnCellMDP: new FCellDateMDP(),
    })
      .addColumn({
        label: "Status Updated On",
        dataSelectorKey: "statusUpdatedOn",
        columnCellMDP: new FCellDateTimeMDP(),
      })

      .addCurrencyColumn({
        label: "Amount",
        dataSelectorKey: "amount",
      }).
      addPsEntryStatusColumn({ dataSelectorKey: "status", }).
      addPaymentStatusColumn({ dataSelectorKey: "paymentStatus", hidden: true })
      .addColumn({
        label: "Linked EMandate",
        dataSelectorKey: "linkedEMandate.label",
        columnCellMDP: new FCellCopyMDP({
          dataSelectorKeyToCopy: "linkedEMandate.redirectUrl",
          dataSelectorKey: "label",
          tooltipText: "Click here to copy EMandate url"
        }),
        hidden: true
      })
      .addColumn({
        label: "Remote EMandate Id",
        dataSelectorKey: "linkedEMandate.remoteEMandateId",
        hidden: true
      })
      .addAction({
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
