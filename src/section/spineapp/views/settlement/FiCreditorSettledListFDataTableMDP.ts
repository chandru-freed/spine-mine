import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";


export default class FiCreditorSettlementListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ title: "Settled Creditors", myRefName: "fiCreditorSettledListRef" });
    this.parent = parent;
    this
    .addClientFileNumberColumn({
      dataSelectorKey:"clientFile.clientFileNumber"
    })
    .addStatusColumn({
      label: "Creditor Name",
      dataSelectorKey: "creditorName",
    })
      .addCurrencyColumn({
        label: "Creditor Balance",
        dataSelectorKey: "creditorBalance",
      })

      .addColumn({
        label: "Last Date Of Payment",
        dataSelectorKey: "lastDateOfPayment",
        columnCellMDP: new FCellDateMDP()
      }).addNumberColumn({
        dataSelectorKey: "daysDelinquentAsOnOnboarding",
        label: "Days Delinquent"
      })
      .addStatusColumn({
        dataSelectorKey: "debtType",
        label: "Debt Type"
      }).
      addColumn({
        dataSelectorKey: "accountNumber",
        label: "Account Number",
      }).
      addCurrencyColumn({
        dataSelectorKey: "settlementAmount",
        label: "Settlement Amount"
      }).addColumn({
        dataSelectorKey: "settlementDate",
        label: "Settlement Date",
        columnCellMDP: new FCellDateMDP()
      })
  }

  collectMSF() {
    return (item: any) => {
      return new Promise(res => {
        this.parent.createCollectMSFThroughCashfree(item);
      })
    }
  }
}
