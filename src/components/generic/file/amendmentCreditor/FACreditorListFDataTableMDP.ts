import FCellCurrencyMDP from "../../table/cell/FCellCurrencyMDP";
import FDataTableMDP, { ActionType } from "../../table/FDataTableMDP"
import FInfoINRMDP from "../../table/info/FInfoINRMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FCellDateMDP from "../../table/cell/FCellDateMDP";
import FCellStatusMDP from "../../table/cell/FCellStatusMDP";
export default class FCreditorListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props:{parent: any}) {
        super({myRefName:"fCreditorListFDataTableRef", title: "Creditors",enableSearch: true,dataSelectorKey:"creditorList",disabled:props.parent.disabled});
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
          }).addColumn({
            label: "Debt Type",
            dataSelectorKey: "debtType",
          }).addColumn({
            label: "Account Number",
            dataSelectorKey: "accountNumber",
          })
          .addColumn({
            label: "Settlement Status",
            dataSelectorKey: "settlementStatus",
            columnCellMDP:new  FCellStatusMDP({
              colorCodeData: Data.Color.FICREDITOR_STATUS,
              outlined: true
            })
          })
          
          .addAction({
            type: ActionType.DELETE,
            onClick: (item, index) => this.deleteCreditorData(item,index),
            label: "",
            confirmation: true
          }).addAction({
            type: ActionType.EDIT,
            onClick: (item,index) => this.selectEditCreditor(item,index),
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
            infoMDP: new FInfoINRMDP({rounded: true})
          }).addInfo({
            label: "WAD",
            value: this.parent.getWAD(),
          })
        
    }

    deleteCreditorData(item: any,index?: number) {
      return this.parent.removeCreditor(item,index);
      
    }

    selectEditCreditor(item: any,index?: number) {
      return new Promise(resolve => {
        console.log(item)
        this.parent.selectEditCreditor(item,index);
      })
    }

    handleAddClick() {
      return new Promise(resolve => {
        this.parent.showAddForm();
        resolve(true);
      })
      
    }
}