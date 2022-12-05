import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP"


export default class PaymentScheduleTableMDP extends FDataTableMDP {

    constructor() {
        super({myRefName:"paymentScheduleTableRef"});

        // this.addColumn({
        //     text: "Payment Provider",
        //     align: "start",
        //     sortable: false,
        //     value: "paymentProvider",
        //   }).addColumn({ text: "status", value: "status" },)
        //   .addColumn({ text: "DraftDate", value: "draftDate" })
        //   .addColumn({ text: "SPA Amount", value: "spaAmount" });


          
          this.addAction({
            type: ActionType.OTHERS,
            label: "Present",
            onClick: (item: any) => this.presentSTEntry(item)
          })

        //   this.actionList = [
        //     {
        //         type: ActionType.OTHERS,
        //         label: "Present",
        //         onClick: (item: any) => {this.presentSTEntry(item)}
        //       },
        //       {
        //         type: ActionType.OTHERS,
        //         label: "Update Account Info",
        //         // onClick: (item: any) => this.handleUpdateAccountDetailsClick(item)
        //       },
              
        //       {
        //         type: ActionType.ADD,
        //         // onClick: () => this.showAddForm(),
        //         label:"Add STEntry"
        //       }
        //   ]
          
    }
    presentSTEntry(item: any) {
      return new Promise(resolve => {
        resolve(true)
      });
    }

}