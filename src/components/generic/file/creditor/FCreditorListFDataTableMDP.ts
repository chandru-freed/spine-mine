import FCellINRMDP from "../../table/cell/FCellINRMDP";
import FDataTableMDP, { ActionType } from "../../table/FDataTableMDP"

export default class FCreditorListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props:{parent: any}) {
        super({myRefName:"fCreditorListFDataTableRef"});
        this.parent = parent;
        this.addColumn({
            label: "Creditor Name",
            dataSelectorKey: "creditorName",
          })
          .addColumn({
            label: "Creditor Balance",
            dataSelectorKey: "creditorBalance",
            columnCellMDP: new FCellINRMDP()
          }).addColumn({
            label: "Last Date Of Payment",
            dataSelectorKey: "lastDateOfPayment",
          }).addColumn({
            label: "Days Delinquent",
            dataSelectorKey: "daysDelinquentAsOnOnboarding",
          }).addColumn({
            label: "Debt Type",
            dataSelectorKey: "debtType",
          }).addColumn({
            label: "Account Number",
            dataSelectorKey: "accountNumber",
          }).addAction({
            type: ActionType.DELETE,
            onClick: item => new Promise(resolve => {}),
            label: "",
            confirmation: true
          }).addAction({
            type: ActionType.EDIT,
            onClick: item => new Promise(resolve => {}),
            label: "",
          })
        
    }
}