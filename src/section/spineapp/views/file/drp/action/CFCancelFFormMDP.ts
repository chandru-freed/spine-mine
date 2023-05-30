import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";

import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";

export default class CFCancelFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ myRefName: "CFRequestCancelRef" });
        this.parent = parent;
        this
            .addField(
                new FSelectFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "reason",
                    label: "Reason",
                    options:reasonCodeList,
                    optionLabel:"name",
                    optionValue:"id",
                    boundaryClass:"col-6"
                })
            ).addField(
                new FTextareaMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "reasonDetails",
                    label: "Reason Details",
                    boundaryClass:"col-6"
                })
            ).addAction(new FBtnMDP({
                label:"Cancel File",
                onClick: this.handleRequestCancel()
            }))
    }
    handleRequestCancel() {
        return () => {
            this.parent.requestCancel();
        }
    }

}


const reasonCodeList: any[] = [
    {
        id: "CR_101",
        name: "Need Loan"
    },

    {
        id: "CR_102",
        name: "Self Service"
    },

    {
        id: "CR_103",
        name: "Others"
    },
    {
        id: "CR_104",
        name: "Forced Cancellation"
    },
    {
        id: "CR_105",
        name: "Direct Settlement"
    },
    {
        id: "CR_106",
        name: "Collection Activities"
    },
    {
        id: "CR_107",
        name: "Client Deceased"
    },
    {
        id: "CR_108",
        name: "Affordability Issue"
    },
    {
        id: "CR_109",
        name: "Family Support"
    },
    {
        id: "CR_110",
        name: "Unforeseen Expense"
    },
    {
        id: "CR_111",
        name: "Not Interested"
    },

    {
        id: "CR_112",
        name: "Dissatisfied with Service"
    }, {
        id: "CR_113",
        name: "Filing Bankruptcy"
    }, {
        id: "CR_114",
        name: "Credibility Issues"
    }, {
        id: "CR_115",
        name: "Client Ineligible"
    }, {
        id: "CR_116",
        name: "Duplicate Sale"
    }, {
        id: "CR_117",
        name: "DCP Prospect"
    },

]
