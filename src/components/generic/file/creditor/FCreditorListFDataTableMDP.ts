import FCellCurrencyMDP from "../../table/cell/FCellCurrencyMDP";
import FDataTableMDP, { ActionType } from "../../table/FDataTableMDP"
import FInfoINRMDP from "../../table/info/FInfoINRMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FCellDateMDP from "../../table/cell/FCellDateMDP";
import FCellTextEllipsisMDP from "../../table/cell/FCellTextEllipsisMDP";
export default class FCreditorListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props:{parent: any}) {
        super({myRefName:"fCreditorListFDataTableRef", enableSearch: true, disabled: props.parent.disabled, itemKey:"fiCreditorId",
      title:"Included Creditors"});
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
            label: "EMI Amount",
            dataSelectorKey: "emiAmount",
          })
          .addColumn({
            label: "Last Date Of Payment",
            dataSelectorKey: "lastDateOfPayment",
            columnCellMDP: new FCellDateMDP(),
            align: 'right'
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
          })
          .addColumn({
            label: "Details",
            dataSelectorKey: "details",
            columnCellMDP: new FCellTextEllipsisMDP(),
          })
          .addAction({
            type: ActionType.DELETE,
            onClick: this.handleExcludeInProgram(),
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
          .addAction({
            type: ActionType.OTHERS,
            onClick: item => this.handleAddCreditorFromPDF(),
            label: "Upload Credit Report PDF",
            noSelect: true
          })
          .addAction({
            type: ActionType.OTHERS,
            onClick: item => this.handleAddCreditScore(),
            label: "Update Credit Score",
            noSelect: true
          })
          // .addAction({
          //   type: ActionType.OTHERS,
          //   onClick: this.handleExcludeInProgram(),
          //   label: "Exclude from program",
          //   singleSelect: true,
          //   confirmation: true
          // })
          .addBooleanColumn({
            label: "InEligible",
            dataSelectorKey: "ineligible",
            hidden: true
          }).addBooleanColumn({
            label: "Exception Taken",
            dataSelectorKey: "exceptionTaken",
            hidden: true
          })
          
          
          .addInfo({
            label: "Total Amount",
            value: this.parent.totalDebt,
            infoMDP: new FInfoINRMDP({})
          }).addInfo({
            label: "WAD",
            value: this.parent.clientFileBasicInfo.wad || 0,
          }).addInfo({
            label: "Credit Score",
            value: this.parent.clientFileBasicInfo.creditScore,
          });
        
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

    handleAddCreditScore() {
      return new Promise(resolve => {
        this.parent.showAddCreditScoreForm();
        resolve(true);
      })
      
    }

    handleAddCreditorFromPDF() {
      return new Promise(resolve => {
        this.parent.showParseCreditReportForm = true;
        resolve(true);
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