

import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellTextEllipsisMDP from "@/components/generic/table/cell/FCellTextEllipsisMDP";

export default class CreditorListInEligibleFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props:{parent: any}) {
        super({myRefName:"fCreditorListIEFDataTableRef", enableSearch: true, disabled: props.parent.disabled, itemKey:"fiCreditorId", title: "Ineligible Creditors"});
        this.parent = props.parent;
        this.addColumn({
            label: "Creditor Name",
            dataSelectorKey: "creditorName",
          })
          .addCurrencyColumn({
            label: "Creditor Balance",
            dataSelectorKey: "creditorBalance",
          }).addDateColumn({
            label: "Last Date Of Payment",
            dataSelectorKey: "lastDateOfPayment",
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