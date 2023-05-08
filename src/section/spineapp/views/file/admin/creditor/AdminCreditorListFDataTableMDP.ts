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
      .addColumn({
        label: "Last Date Of Payment",
        dataSelectorKey: "lastDateOfPayment",
        columnCellMDP: new FCellDateMDP(),
      })
      .addNumberColumn({
        label: "Days Delinquent",
        dataSelectorKey: "daysDelinquentAsOnOnboarding",
      })
      .addNumberColumn({
        label: "DPD",
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
      .addColumn({
        label: "Settlement Status",
        dataSelectorKey: "settlementStatus",
        columnCellMDP: new FCellStatusMDP({
          colorCodeData: Data.Color.FICREDITOR_STATUS,
          outlined: true
        }),
      })
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
        type: ActionType.ADD,
        onClick: () => this.handleAddCreditor(),
        label: "Add Creditor",
        noSelect: true,
      })
      .addAction({
        type: ActionType.DELETE,
        onClick: this.handleExcludeInProgram(),
        label: "Delete Creditor",
        noSelect: true,
        confirmation: true
      }).addAction({
        type: ActionType.EDIT,
        onClick: (item) => this.handleEditCreditor(item),
        label: "Edit Creditor",
        noSelect: true,
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

  handleAddCreditor() {
    return new Promise(resolve => {
      this.parent.showAddForm();
      resolve(true);
    })
  }


  
  handleEditCreditor(item: any) {
    return new Promise(res => {
      this.parent.selectEditCreditor(item);
      res(true)
    })
  }


  handleExcludeInProgram() {
    return (item: any) => {
        return new Promise(resolve => {
            this.parent.handleExcludeInProgram(item);
            resolve(true);
          })
    }
}


}
