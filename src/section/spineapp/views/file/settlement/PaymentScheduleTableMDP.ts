import FDataTableMDP, { ActionType } from "@/components/generic/FDataTableMDP"


export default class PaymentScheduleTableMDP extends FDataTableMDP {

    constructor() {
        super({dataSelectorKey: "stFeeEntryList"});

        this.addField({
            text: "Payment Provider",
            align: "start",
            sortable: false,
            value: "paymentProvider",
          }).addField({ text: "status", value: "status" },)
          .addField({ text: "DraftDate", value: "draftDate" })
          .addField({ text: "SPA Amount", value: "spaAmount" });


          
          this.addAction({
            type: ActionType.OTHERS,
            label: "Present",
            onClick: (item: any) => {this.presentSTEntry(item)}
          }).addAction({

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

    }

}