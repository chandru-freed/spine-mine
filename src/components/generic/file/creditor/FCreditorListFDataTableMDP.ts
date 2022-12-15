import FCellCurrencyMDP from "../../table/cell/FCellCurrencyMDP";
import FDataTableMDP, { ActionType } from "../../table/FDataTableMDP"
import FInfoINRMDP from "../../table/info/FInfoINRMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FCellDateMDP from "../../table/cell/FCellDateMDP";
export default class FCreditorListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props:{parent: any}) {
        super({myRefName:"fCreditorListFDataTableRef", title: "Creditors",enableSearch: true, disabled: props.parent.disabled});
        this.parent = props.parent;
        this.addColumn({
            label: "Creditor Name",
            dataSelectorKey: "creditorName",
          })
          .addCurrencyColumn({
            label: "Creditor Balance",
            dataSelectorKey: "creditorBalance",
          }).addColumn({
            label: "Last Date Of Payment",
            dataSelectorKey: "lastDateOfPayment",
            columnCellMDP: new FCellDateMDP()
          }).addNumberColumn({
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
          }).addColumn({
            label: "Account Number",
            dataSelectorKey: "accountNumber",
          }).addAction({
            type: ActionType.DELETE,
            onClick: item => this.deleteCreditorData(item),
            label: "",
            confirmation: true
          }).addAction({
            type: ActionType.EDIT,
            onClick: item => this.selectEditCreditor(item),
            label: "",
            confirmation: true
          }).addAction({
            type: ActionType.ADD,
            onClick: item => this.handleAddClick(),
            label: "Add Creditor",
          })
          
          .addInfo({
            label: "Total Amount",
            value: this.parent.totalDebt,
            infoMDP: new FInfoINRMDP({})
          }).addInfo({
            label: "WAD",
            value: this.parent.clientFileSummary.wad,
          })
        
    }

    deleteCreditorData(item: any) {
      return new Promise(resolve => {
        Action.Spine.RemoveCreditor.execute1(item.fiCreditorId, (output) => {
          Snackbar.show({
            text: "Succesfully Removed",
            pos: "bottom-center",
          });
          resolve(true);
        });
      })
      
    }

    selectEditCreditor(item: any) {
      return new Promise(resolve => {
        this.parent.selectEditCreditor(item);
      })
    }

    handleAddClick() {
      return new Promise(resolve => {
        this.parent.showAddForm();
        resolve(true);
      })
      
    }
}