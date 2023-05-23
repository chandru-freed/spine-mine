import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";

export default class FiCreditorSettlementFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ title: "Accounts Nearing Settlement", myRefName: "FiCreditorSettlementListRef" });
    this.parent = parent;
    this
    .addClientFileNumberColumn({
      dataSelectorKey:"clientFile.clientFileNumber",
    })
    .addClientNameColumn({
      dataSelectorKey:"clientFile.clientBasicInfo.fullName",
      width:"15%"
    })
    .addColumn({
      label: "Creditor Name",
      dataSelectorKey: "creditorName",
      enableGroupBy: true,
    }).addStatusColumn({
        dataSelectorKey: "debtType",
        label: "Debt Type",
      })
      .addCurrencyColumn({
        label: "Creditor Balance",
        dataSelectorKey: "creditorBalance",
      })
      .addCurrencyColumn({
        label: "SPA Balance",
        dataSelectorKey: "spaSavingAmount",
      })
      .addColumn({
        label:"Mobile",
        dataSelectorKey:"clientFile.clientBasicInfo.mobile",
        columnCellMDP: new FCellPhoneMDP(),
        hidden: true
      })

      .addColumn({
        label: "Last Date Of Payment",
        dataSelectorKey: "lastDateOfPayment",
        columnCellMDP: new FCellDateMDP()
      }).addNumberColumn({
        dataSelectorKey: "daysDelinquentAsOnOnboarding",
        label: "Delinquency(at Enrolment)"
      })
      .addColumn({
        label:"PAN",
        dataSelectorKey:"clientFile.clientBasicInfo.pan",
        hidden: true
      })
      .addColumn({
        label:"City",
        dataSelectorKey:"clientFile.clientBasicInfo.city",
        enableGroupBy: true,
      })
      .addColumn({
        label:"State",
        dataSelectorKey:"clientFile.clientBasicInfo.state",
        enableGroupBy: true,
        hidden: true
      })
      .
      addColumn({
        dataSelectorKey: "accountNumber",
        label: "Account Number",
        hidden: true
      }).
      addCurrencyColumn({
        dataSelectorKey: "settlementAmount",
        label: "Settlement Amount"
      })

      this.addNumberColumn({
        dataSelectorKey: "savingPercentage",
        label: "Saving Percentage",
        enableGroupBy: true,
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
