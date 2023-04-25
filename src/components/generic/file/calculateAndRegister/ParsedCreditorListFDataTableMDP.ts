import FDataTableMDP from "@/components/generic/table/FDataTableMDP";

      export default class ParsedCreditorListFDataTableMDP  extends FDataTableMDP {
          parent: any;
          constructor({ parent }: { parent: any }) {
              super({title: "Parsed Creditor List", myRefName: "ParsedCreditorListRef"});
              this.parent = parent;
              this
              .addStatusColumn({
                          label:"Settlement Status",
                          dataSelectorKey: "settlementStatus"
                      }).addColumn({
                          label:"Creditor Name",
                          dataSelectorKey: "creditorName"
                      }).addCurrencyColumn({
                          label:"Creditor Balance",
                          dataSelectorKey: "creditorBalance"
                      }).addDateColumn({
                          label:"Last Date Of Payment",
                          dataSelectorKey: "lastDateOfPayment"
                      }).addStatusColumn({
                          label:"Debt Type",
                          dataSelectorKey: "debtType"
                      }).addColumn({
                          label:"Account Number",
                          dataSelectorKey: "accountNumber"
                      })
          }
      }
      