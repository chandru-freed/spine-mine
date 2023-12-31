import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellCurrencyBtnMDP from "@/components/generic/table/cell/FCellCurrencyBtnMDP";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";

export default class NupayMigratedCFFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent, dataSelectorKey }: { parent: any;dataSelectorKey?:string }) {
    super({
      itemKey: "psEntryId",
      disabled: parent.disabledActionBtn,
      // title: "Migrated CF Payment Summary",
      myRefName: "nupayMigratedCFFDataTableRef",
      groupBySummaryFunction: (itemList) => this.calculateTotal(itemList),
      dataSelectorKey:dataSelectorKey
    });
    this.parent = parent;
    this
      .addColumn({
        label: "Payment Ref Number",
        dataSelectorKey: "paymentRefNumber",
        columnCellMDP: new FCellBtnMDP({
          color: "secondary",
          onClick: (item) => {
            this.parent.openPaymentDetails(item);
          },
        }),
        enableCopy: true,
        copyTooltipText: "Click here to copy the payment link",
        dataSelectorKeyToCopy: "selfEnrolPaymentLink",
        width: "23%"
      }).addStatusColumn({
        label: "Payment Type",
        dataSelectorKey: "paymentType.name",
        filterItemList: Data.ClientFile.PAYMENT_TYPE.list()
        //   columnCellMDP: new FCellDateMDP(),
      })
      .addCurrencyColumn({
        label: "SPA Amount",
        dataSelectorKey: "spaAmount",
      })
      .addCurrencyColumn({
        label: "Fee Amount",
        dataSelectorKey: "feeAmount",
      })
      .addCurrencyColumn({
        label: "MSF Amount",
        dataSelectorKey: "msfAmount",
      })
      .addCurrencyColumn({
        label: "Total Amount",
        dataSelectorKey: "totalAmount",
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
        label: "Ach Seq Number",
        dataSelectorKey: "achSeqNumber",
        hidden: true
      })

      .addStatusColumn({
        label: "Received By",
        dataSelectorKey: "receivedBy",
      })
      .addAction({
        label: "Info",
        onClick: this.handleInfoClick(),
        type: ActionType.INFO
      })
      ;
  }
  calculateTotal(itemList: any[]) {
    const totalAmount = itemList.reduce((acc: number, item: any) => {
      const val = typeof (item['totalAmount']) == 'number' ? item['totalAmount'] : 0;
      acc = acc + val;
      return acc
    }, 0)
    return 'Total Amount: ' + totalAmount;
  }

  handleInfoClick() {
    return (item: any) => { 
      return new Promise(res => {
        this.parent.handleInfoClick(item);
        res(true);
      }) }
  }
}
