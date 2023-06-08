import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellCurrencyBtnMDP from "@/components/generic/table/cell/FCellCurrencyBtnMDP";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FBtnMDP from "@/components/generic/FBtnMDP";
import PaymentDetailsInfoFFormMDP from "./PaymentDetailsInfoFFormMDP";
import * as Action from "@/../src-gen/action";
export default class CFPaymentListFDataTableMDP extends FDataTableMDP {
  parent: any;
  itemSelected: any;
  constructor({ parent }: { parent: any; }) {
    super({
      itemKey: "psEntryId",
      disabled: parent?.taskRoot?.taskDisabled,
      title: "Payment List",
      myRefName: "fCFPaymentFDataTableRef",
      groupBySummaryFunction: (itemList) => this.calculateTotal(itemList),
      enableInfo: true,
      infoForm: new PaymentDetailsInfoFFormMDP({
        parent: parent
      }),
      itemSelectedEventFunction: (item) => parent.selectedPaymentSummaryToView = item
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
      })
      .addPaymentStatusColumn({ label: "Status", dataSelectorKey: "status.name", })
      .addStatusColumn({
        label: "Type",
        dataSelectorKey: "paymentType.name",
        filterItemList: Data.ClientFile.PAYMENT_TYPE.list()
      })
      .addPaymentProviderColumn({ dataSelectorKey: "paymentProvider.name", })
      .addCurrencyColumn({
        label: "SPA Amount",
        dataSelectorKey: "spaAmount",
      })
      .addCurrencyColumn({
        label: "FEE Amount",
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
        label: "Presented Date",
        dataSelectorKey: "presentedDate",
        columnCellMDP: new FCellDateMDP(),
      })

      .addStatusColumn({
        label: "Received By",
        dataSelectorKey: "receivedBy",
        hidden: true
      })
      .addColumn({
        label: "Last Updated Time",
        dataSelectorKey: "lastUpdatedTime",
        columnCellMDP: new FCellDateTimeMDP(),
        hidden: true
      })

      .addColumn({
        label: "Remote Txn RefNumber",
        dataSelectorKey: "remoteTxnRefNumber",
        hidden: true
      })
      .addColumn({
        label: "Account Number",
        dataSelectorKey: "accountNumber",
        hidden: true
      })
      .addColumn({
        label: "Account Holder Name",
        dataSelectorKey: "accountHolderName",
        hidden: true
      })

      .addColumn({
        label: "Account Type",
        dataSelectorKey: "accountType",
        hidden: true
      })

      .addColumn({
        label: "IFSC Code",
        dataSelectorKey: "ifscCode",
        hidden: true
      })


      .addColumn({
        label: "SelfEnrol Payment Link",
        dataSelectorKey: "selfEnrolPaymentLink",
        hidden: true,
        enableCopy: true
      })
      .addColumn({
        label: "Ach Seq Number",
        dataSelectorKey: "achSeqNumber",
        hidden: true
      })

      .addColumn({
        label: "Ref Id",
        dataSelectorKey: "refId",
        hidden: true
      })

      .addColumn({
        label: "Payment Mode",
        dataSelectorKey: "paymentMode",
        hidden: true
      })


      .addColumn({
        label: "EMandate Id",
        dataSelectorKey: "eMandateId",
        hidden: true
      })


      .addColumn({
        label: "Details",
        dataSelectorKey: "details",
        hidden: true
      })


      .addColumn({
        label: "Settled To",
        dataSelectorKey: "settledTo",
        hidden: true
      })


      .addColumn({
        label: "Settled To Id",
        dataSelectorKey: "settledToId",
        hidden: true
      })
      .addAction({
        label: "Refresh",
        onClick: this.handleRefreshClick(),
        type: ActionType.REFRESH,
        noSelect: true,
      })
      .addInfoAction(new FBtnMDP({
        label: "Request fund Split",
        onClick: () => { }
      }));
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
        alert("hello")
        res(true);
      })
    }
  }
  handleRefreshClick() {

    return () => {
      return new Promise((res) => {

        this.getFiPaymentList()
        this.getClientFileBasicInfo();
      })
    }
  }

  getClientFileBasicInfo() {
    if (this.parent?.clientFileBasicInfo) {
      Action.ClientFile.GetClientFileBasicInfo.execute1(
        this.parent?.clientFileBasicInfo?.clientFileNumber,
        (output) => { }
      );
    }
  }
  getFiPaymentList() {
    Action.ClientFile.GetFiPaymentList.execute1(this.parent.clientFileId, (output) => {
      
    });
  }

  selectItem(item: any) {
    console.log(item);
  }
}
