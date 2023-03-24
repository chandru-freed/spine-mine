import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FCellStandardDateTimeMDP from "@/components/generic/table/cell/FCellStandardDateTimeMDP";

export default class AgentListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ title: "AgentList", myRefName: "agentListFDataTableRef" });
        this.parent = parent;
        this.addColumn({
            label: "ApplicantName",
            dataSelectorKey: "applicantName",
        })
            .addColumn({
                label: "Collector Name",
                dataSelectorKey: "collectorName",
            })
            .addColumn({
                label: "Collector PhoneNumber",
                dataSelectorKey: "collectionCreditorPhoneNumber",
            })
            .addColumn({
                label: "TypeOfLoan",
                dataSelectorKey: "typeOfLoan",
            })
            .addColumn({
                label: "Collector EmailId",
                dataSelectorKey: "collectionCreditorEmailId",
            })
            .addColumn({
                label: "Collector Alternate Number",
                dataSelectorKey: "collectionCreditorAlternateNumber",
            })
            .addColumn({
                label: "Collection Agency",
                dataSelectorKey: "collectionAgency",
            })
            .addColumn({
                label: "Creditor Code",
                dataSelectorKey: "creditorCode",
            })
            .addCurrencyColumn({
                label: "Offer Amount",
                dataSelectorKey: "offerAmount",
            })
            .addCurrencyColumn({
                label: "Counter Offer Amount",
                dataSelectorKey: "counterOfferAmount",
            })
            .addCurrencyColumn({
                label: "Current Balance",
                dataSelectorKey: "currentBalance",
            })
            .addColumn({
                label: "Created By Name",
                dataSelectorKey: "createdByName",

            })
            .addColumn({
                label: "Created Date",
                dataSelectorKey: "createdDate",
                columnCellMDP: new FCellStandardDateTimeMDP()
            })
            .addAction({
                label: "Create Agent",
                type: ActionType.ADD,
                onClick: this.createAgentClick()
            })

    }

    createAgentClick() {
        return () => {
            return new Promise(res => {
                this.parent.openCreateAgentPage();
                res(true);
            })   
        }
    }


}
