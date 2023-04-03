import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellCopyMDP from "@/components/generic/table/cell/FCellCopyMDP";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FCellNameMDP from "@/components/generic/table/cell/FCellNameMDP";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellTextMDP from "@/components/generic/table/cell/FCellTextMDP";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";

export default class SearchPaymentFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any; myRefName: string }) {
    super({
      myRefName: props.myRefName,
      enableSearch: true,
      title: "Payment List",
      itemKey: "taskId",
    });
    this.parent = props.parent;
    this
      .addClientFileNumberColumn({ dataSelectorKey: "clientFileNumber" })
      .addClientNameColumn({ dataSelectorKey: "clientBasicInfo.fullName", paramKey: "clientBasicInfo.clientId" })
      .addStatusColumn({
        label: "Payment Type",
        dataSelectorKey: "paymentType"
      }).addPaymentProviderColumn({
        dataSelectorKey: "paymentProvider.name"
      }).addStatusColumn({
        label: "Payment Mode",
        dataSelectorKey: "paymentMode.name",
        hidden: true
      }).addColumn({
        label: "Settled To",
        dataSelectorKey: "settledTo",
        hidden: true
      }).addColumn({
        label: "Account Number",
        dataSelectorKey: "accountNumber",
      }).addColumn({
        label: "Account Holder Name",
        dataSelectorKey: "accountHolderName",
        hidden: true
      }).addColumn({
        label: "Account Type",
        dataSelectorKey: "accountType",
        hidden: true
      }).addColumn({
        label: "Ifsc Code",
        dataSelectorKey: "ifscCode",
        hidden: true
      }).addDateColumn({
        label: "Presented Date",
        dataSelectorKey: "presentedDate",
      }).addCurrencyColumn({
        label: "Total Amount",
        dataSelectorKey: "totalAmount",
      }).addColumn({
        label: "SPA Amount",
        dataSelectorKey: "spaAmount",
        hidden: true
      }).addColumn({
        label: "FEE Amount",
        dataSelectorKey: "feeAmount",
        hidden: true
      }).addColumn({
        label: "MSF Amount",
        dataSelectorKey: "msfAmount",
        hidden: true
      }).addColumn({
        label: "Payment Ref Number",
        dataSelectorKey: "paymentRefNumber",
        columnCellMDP: new FCellCopyMDP({
          dataSelectorKeyToCopy: "remoteTxnRefDetails.paymentLink",
          tooltipText: "Clieck here to copy payment url"
        })
      }).addColumn({
        label: "remote Txn Ref Number",
        dataSelectorKey: "remoteTxnRefNumber",
        hidden: true
      }).addColumn({
        label: "Ach Seq Number",
        dataSelectorKey: "achSeqNumber",
        hidden: true
      }).addPaymentStatusColumn({
        dataSelectorKey: "status.name"
      }).addColumn({
        label: "Details",
        dataSelectorKey: "details",
        hidden: true
      }).addColumn({
        label: "Received By",
        dataSelectorKey: "receivedBy",
        enableGroupBy: true
      }).addColumn({
        label: "Ref Id",
        dataSelectorKey: "refId",
        hidden: true
      }).addDateTimeColumn({
        label: "Last Updated Time",
        dataSelectorKey: "lastUpdatedTime",
        hidden: true
      })
  }

  handleClientFileClick(item: any) {
    this.parent.gotoFile(item);
  }
}
