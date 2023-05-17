import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellCurrencyBtnMDP from "@/components/generic/table/cell/FCellCurrencyBtnMDP";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";

export default class CFTransactionListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({
      itemKey: "psEntryId",
      disabled: parent.disabledActionBtn,
      title: "Transaction List",
      myRefName: "cfTransactionListRef",
      groupBySummaryFunction: (itemList) => this.calculateTotal(itemList)
    });
    this.parent = parent;
    this.addStatusColumn({
      label: "Account Identifier",
      dataSelectorKey: "accountIdentifier",
      filterItemList: Data.ClientFile.PAYMENT_TXN_ACCT.list()
    })
      .addStatusColumn({
        label: "Intent",
        dataSelectorKey: "intent",
        filterItemList: Data.ClientFile.INTENT.list()
      })
      .addCurrencyColumn({
        label:'Amount',
        dataSelectorKey:'amount'
      })

      .addColumn({
        label:"Payment Ref Number",
        dataSelectorKey:"paymentRefNumber",
        enableCopy: true,
        
      })
      .addColumn({
        label: "Remote Txn Ref Number",
        dataSelectorKey: "remoteTxnRefNumber",
        enableCopy: true,
      })
      .addColumn({
        label:"Txn Date",
        dataSelectorKey:"txnDate",
        columnCellMDP: new FCellDateMDP()
      })
  }
  calculateTotal(itemList: any[]) {
    const totalAmount = itemList.reduce((acc: number, item: any) => {
      const val = typeof (item['amount']) == 'number' ? item['amount'] : 0;
      acc = acc + val;
      return acc
  }, 0)
  return 'Total Amount: ' + totalAmount;
    
  }
}
