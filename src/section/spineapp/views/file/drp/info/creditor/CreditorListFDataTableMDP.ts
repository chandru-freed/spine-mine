import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FInfoINRMDP from "@/components/generic/table/info/FInfoINRMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FCellTextEllipsisMDP from "@/components/generic/table/cell/FCellTextEllipsisMDP";
export default class CreditorListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "fCreditorListFDataTableRef",
      enableSearch: true,
      itemKey: "fiCreditorId",
      title: "Eligible Creditors"
    });
    this.parent = props.parent;
    this.addColumn({
      label: "Creditor Name",
      dataSelectorKey: "creditorName",
    })
      .addCurrencyColumn({
        label: "Creditor Balance",
        dataSelectorKey: "creditorBalance",
      })
      .addCurrencyColumn({
        label: "Emi Amount",
        dataSelectorKey: "emiAmount",
      })
      .addColumn({
        label: "Last Date Of Payment",
        dataSelectorKey: "lastDateOfPayment",
        columnCellMDP: new FCellDateMDP(),
      })
      .addNumberColumn({
        label: "Delinquency(at Enrolment)",
        dataSelectorKey: "daysDelinquentAsOnOnboarding",
      })
      .addNumberColumn({
        label: "Delinquency(as on date)",
        dataSelectorKey: "daysPastDue",
      })
      .addColumn({
        label: "Debt Type",
        dataSelectorKey: "debtType",
      })
      .addColumn({
        label: "Account Number",
        dataSelectorKey: "accountNumber",
      })
      .addColumn({
        label: "Details",
        dataSelectorKey: "details",
        columnCellMDP: new FCellTextEllipsisMDP()
      })
      .addBooleanColumn({
          label: "Settled",
        dataSelectorKey: "isSettled",
      })
      // .addStatusColumn({
      //   label: "Settlement Status",
      //   dataSelectorKey: "settlementStatus",
      //   colorCodeData: Data.Color.FICREDITOR_STATUS,
      //   outlined: true,
      //   filterItemList: Data.Spine.FICREDITOR_STATUS.list()
      // })
      .addAction({
        type: ActionType.OTHERS,
        onClick: (item) => this.handleMarkSettleClick(item),
        label: "Mark Settle",
        confirmation: true,
        disabled: this.parent.isClientFileLead(),
      }).addAction({
        type: ActionType.OTHERS,
        onClick: () => this.handleAddCreditScore(),
        label: "Update Credit Score",
        noSelect: true,
      }).addAction({
        type: ActionType.OTHERS,
        onClick: (item) => this.handleAddAccountNoClick(item),
        label: "Update Account No.",
      })

      .addInfo({
        label: "Total Amount",
        value: this.parent.totalDebt,
        infoMDP: new FInfoINRMDP({})
      }).addInfo({
        label: "WAD",
        value: this.parent.clientFileBasicInfo.wad,
      }).addInfo({
        label: "Credit Score",
        value: this.parent.clientFileBasicInfo.creditScore,
      });
  }

  handleMarkSettleClick(item: any) {
    return new Promise((resolve) => {
      this.parent.settleCreditorInput.fiCreditorId = item.fiCreditorId;
      Action.ClientFile.SettleCreditor.execute(
        this.parent.settleCreditorInput,
        (output) => {
          setTimeout(() => {
            this.parent.getFiCreditorInfo();
            this.parent.findClientFileSummary();
          }, 500);
          Snackbar.show({
            text: "Succesfully Settled Creditor",
            pos: "bottom-center",
          });
          resolve(true);
        },
        (err) => console.log(err)
      );
    });
  }

  handleAddCreditScore() {
    return new Promise(resolve => {
      this.parent.showAddCreditScoreForm();
      resolve(true);
    })
  }

  handleAddAccountNoClick(item: any) {
    return new Promise(resolve => {
    this.parent.handleAddAccountNoClick(item);
    });
  }
}
