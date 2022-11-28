import { FColumnBtnMDP } from "@/components/generic/table/cell/FColumnBtnMDP";
import { FColumnINRMDP } from "@/components/generic/table/cell/FColumnINRMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP"

export default class CFStPlanListFDataTableMDP extends FDataTableMDP {
    root: any;
    constructor({root}: {root: any}){
        super();
        this.root = root;

        this.addColumn({
            label:"Creditor Name",
            dataSelectorKey: "fiCreditor.creditorName",
            columnCellMDP: new FColumnBtnMDP({
                onClick: (item) => this.handleCreditorClick(item),
            })

        }).addColumn({
            label:"Settlement Amount",
            dataSelectorKey: "settlementAmount",
            columnCellMDP: new FColumnINRMDP()

        }).addColumn({
            label:"Total Outstanding",
            dataSelectorKey: "totalOutstanding",
            columnCellMDP: new FColumnINRMDP()

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
        this.root.showAddSettlementPlanForm = true;

    }
}