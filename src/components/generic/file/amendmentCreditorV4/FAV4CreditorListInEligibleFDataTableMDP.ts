//TOBE_REMOVED

import FCellCurrencyMDP from "../../table/cell/FCellCurrencyMDP";
import FDataTableMDP, { ActionType } from "../../table/FDataTableMDP"
import FInfoINRMDP from "../../table/info/FInfoINRMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FCellDateMDP from "../../table/cell/FCellDateMDP";
import FCellTextEllipsisMDP from "../../table/cell/FCellTextEllipsisMDP";
export default class FAV4CreditorListInEligibleFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props:{parent: any}) {
        super({myRefName:"fACreditorListFDataTableRef", enableSearch: true, disabled: props.parent.disabled, itemKey:"amendmentFiCreditorId", title: "Ineligible Creditors"});
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
          .addBooleanColumn({
            label: "InEligible",
            dataSelectorKey: "ineligible",
            hidden: true
          })
          .addBooleanColumn({
            label: "Exception Taken",
            dataSelectorKey: "exceptionTaken",
            hidden: true
          })
          .addAction({
            type: ActionType.DELETE,
            onClick: item => this.deleteCreditorData(item),
            label: "",
            confirmation: true
          }).addAction({
            type: ActionType.EDIT,
            onClick: item => this.selectEditCreditor(item),
            label: "",
            confirmation: true
          })
          .addAction({
            type: ActionType.OTHERS,
            onClick: this.handleIncludeInProgram(),
            label: "Include in program",
            singleSelect: true,
            confirmation: true
          });
        
    }

    deleteCreditorData(item: any) {
      return new Promise(resolve => {
        // Action.Spine.RemoveCreditor.execute1(item.fiCreditorId, (output) => {
        //   Snackbar.show({
        //     text: "Succesfully Removed",
        //     pos: "bottom-center",
        //   });
        //   resolve(true);
        // });
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

    handleIncludeInProgram() {
        return (item: any) => {
            return new Promise(resolve => {
                this.parent.handleIncludeInProgram(item);
                resolve(true);
              })
        }
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
    
}