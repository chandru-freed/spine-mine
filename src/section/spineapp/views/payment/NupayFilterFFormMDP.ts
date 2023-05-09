import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class NupayFilterFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ myRefName: "NupayFilterRef" });
        this.parent = parent;
        this
            .addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "clientFileNumber",
                    label: "Client File Number",
                    boundaryClass: "col-4"
                })
            ).addAction(new FBtnMDP({
                label: "Search",
                onClick: () => {this.parent.handleSearchClick()}
            }))
    }
}
