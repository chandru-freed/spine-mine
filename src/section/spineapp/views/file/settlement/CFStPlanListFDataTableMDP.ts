import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellINRMDP from "@/components/generic/table/cell/FCellINRMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP"

export default class CFStPlanListFDataTableMDP extends FDataTableMDP {
    root: any;
    constructor({root}: {root: any}){
        super({
            myRefName: "cfstPlanListFDataTableRef"
        });
        this.root = root;

        this.addColumn({
            label:"Creditor Name",
            dataSelectorKey: "fiCreditor.creditorName",
            columnCellMDP: new FCellBtnMDP({
                onClick: (item) => this.handleCreditorClick(item),
            })

        }).addColumn({
            label:"Settlement Amount",
            dataSelectorKey: "settlementAmount",
            columnCellMDP: new FCellINRMDP({})

        }).addColumn({
            label:"Total Outstanding",
            dataSelectorKey: "totalOutstanding",
            columnCellMDP: new FCellINRMDP({})

        }).addColumn({
            label:"Settlement Percentage",
            dataSelectorKey: "settlementPercentage",

        }).addColumn({
            label:"Status",
            dataSelectorKey: "status",
        }).addAction({
            label: "Create Settlement Plan",
            onClick: (item) => this.handleCreateSettlementPlan(),
            type: ActionType.ADD
        })
    }
    handleCreditorClick(item: any) {
        console.log(item,"Go to");
        this.root.gotoPaymentPlan(item.fiSettlementPlanId)
    }
    handleCreateSettlementPlan() {
        return new Promise((resolve, reject) => {
            this.root.showAddSettlementPlanForm = true;    
        })
        

    }
}