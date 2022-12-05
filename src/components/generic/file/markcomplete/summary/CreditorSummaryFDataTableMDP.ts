
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";

export default class CreditorSummaryFDataTableMDP extends FDataTableMDP {
    childMDP = new FFormChildMDP();
    constructor(props: {taskRoot: any}) {
        super({
            dataSelectorKey: "creditorList",
            myRefName:"creditorSummaryFDataTableRef"
        });
        this.addColumn({
            label: "Creditor Name",
            dataSelectorKey:"creditorName"
        }).addColumn({
            label: "Type",
            dataSelectorKey:"debtType"
        }).addColumn({
            label: "Outstanding Amount",
            dataSelectorKey:"creditorBalance"
        }).addColumn({
            label: "Days Delinquent",
            dataSelectorKey:"daysDelinquentAsOnOnboarding"
        })
        
        .addAction({
            label:`WAD: ${props.taskRoot.clientFileSummary.wad}`,
            onClick: () => new Promise(resolve => {}),
            type: ActionType.OTHERS,
            disabled: true
        })
        
        ;
    }

}