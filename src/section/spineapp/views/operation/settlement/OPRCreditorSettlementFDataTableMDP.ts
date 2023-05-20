import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import * as Action from "@/../src-gen/action";
import Helper from "@/section/spineapp/util/Helper";
import FCellAccountNumberMDP from "@/components/generic/table/cell/FCellAccountNumberMDP";
export default class FiCreditorSettlementFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ title: "Accounts nearing settlement", myRefName: "FiCreditorSettlementRef" });
    this.parent = parent;
    this
      .addClientFileNumberColumn({
        label: "Client  File  Number",
        dataSelectorKey: "clientFileNumber"
      }).addClientFileStatusColumn({
        label: "Client  File  Status",
        dataSelectorKey: "clientFileStatus.name"
      }).addColumn({
        label: "Full  Name",
        dataSelectorKey: "fullName"
      }).addColumn({
        label: "Mobile",
        dataSelectorKey: "mobile"
      }).addColumn({
        label: "Creditor  Name",
        dataSelectorKey: "creditorName"
      }).addStatusColumn({
        label: "Debt  Type",
        dataSelectorKey: "debtType"
      }).addColumn({
        label: "Account  Number",
        dataSelectorKey: "accountNumber",
        columnCellMDP: new FCellAccountNumberMDP()
      }).addCurrencyColumn({
        label: "Creditor  Balance",
        dataSelectorKey: "creditorBalance"
      }).addCurrencyColumn({
        label: "Spa  Saving  Amount",
        dataSelectorKey: "spaSavingAmount"
      }).addDateColumn({
        label: "Last  Payment  Date",
        dataSelectorKey: "lastPaymentDate"
      }).addColumn({
        label: "Days  Delinquent  As  On  Onboarding",
        dataSelectorKey: "daysDelinquentAsOnOnboarding"
      }).addNumberColumn({
        label: "Saving  Percentage",
        dataSelectorKey: "savingPercentage"
      })
      .addAction({
        label: "Download",
        onClick: this.handleDownloadClick(),
        type: ActionType.OTHERS,
        noSelect: true
      })
  }
  handleDownloadClick() {
    return () => {
      return new Promise(res => {
        Helper.downloadFile("spinereportapi/misreports/spa-saving-percentage-dump", "spaSavingPercentageDump.csv")
      })
    }
  }
}
