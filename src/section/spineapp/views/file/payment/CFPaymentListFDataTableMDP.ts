import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellCurrencyBtnMDP from "@/components/generic/table/cell/FCellCurrencyBtnMDP";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";

export default class CFPaymentListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({
      itemKey: "psEntryId",
      disabled: parent.disabledActionBtn,
      title: "Payment List",
      myRefName: "fCFPaymentFDataTableRef",
      groupBySummaryFunction: (itemList) => this.calculateTotal(itemList)
    });
    this.parent = parent;
    this.addStatusColumn({
      label: "Payment Type",
      dataSelectorKey: "paymentType.name",
      filterItemList: Data.ClientFile.PAYMENT_TYPE.list()
      //   columnCellMDP: new FCellDateMDP(),
    })
      .addColumn({
        label: "Total Amount",
        dataSelectorKey: "totalAmount",
        columnCellMDP: new FCellCurrencyBtnMDP({
          color: "secondary",
          onClick: (item) => {
            this.parent.openPaymentDetails(item);
          },
        }),
      })
      .addColumn({
        label: "Account Holder Name",
        dataSelectorKey: "accountHolderName",
        // columnCellMDP: new FCellCurrencyMDP({}),
      })
      .addPaymentProviderColumn({ dataSelectorKey: "paymentProvider.name", })
      .addPaymentStatusColumn({ label: "Status", dataSelectorKey: "status.name", })
      .addColumn({
        label: "Presented Date",
        dataSelectorKey: "presentedDate",
        columnCellMDP: new FCellDateMDP(),
      })
      .addColumn({
        label: "Last Updated Time",
        dataSelectorKey: "lastUpdatedTime",
        columnCellMDP: new FCellDateTimeMDP(),
        hidden: true
        
      })
      .addColumn({
        label:"Payment Ref Number",
        dataSelectorKey:"paymentRefNumber",
        hidden: true
      })
      .addColumn({
        label:"Ach Seq Number",
        dataSelectorKey:"achSeqNumber",
        hidden: true
      })
      
      .addStatusColumn({
        label: "Received By",
        dataSelectorKey: "receivedBy",
      });
  }
  calculateTotal(itemList: any[]) {
    const totalAmount = itemList.reduce((acc: number, item: any) => {
      const val = typeof (item['totalAmount']) == 'number' ? item['totalAmount'] : 0;
      acc = acc + val;
      return acc
  }, 0)
  return 'Total Amount: ' + totalAmount;
    
  }
}
