
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class DocumentSummaryFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    constructor() {
        super({
            myRefName: "documentSummaryFForm",

        });

        this.addField(new FTextFieldMDP({
            dataSelectorKey: "documentSummary.documentsCount",
            label: "Document Count",
            parentMDP: this.childMDP,
            readonly: true,
            boundaryClass: "col-4"
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "documentSummary.documentTypeList",
            label: "Document Type List",
            parentMDP: this.childMDP,
            readonly: true,
            boundaryClass: "col-4"
        }))
    }

}