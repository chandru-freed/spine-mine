import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FAccountFieldMDP from "@/components/generic/form/field/FAccountFieldMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import FEMandateSelectFieldMDP from "@/components/generic/form/field/FEMandateSelectFieldMDP";
import FRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FRemoteAutoCompleteFieldMDP";
import FCityAutoCompleteFieldMDP from "@/components/generic/form/field/FCityAutoCompleteFieldMDP";
import FStateSelectFieldMDP from "@/components/generic/form/field/FStateSelectFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";

export default class FilterAccountListFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({
            myRefName: "filterAccountListFFormRef",
            disabled: parent.taskDisabled,
        });
        this.parent = parent;

        this.addField(
            new FRemoteAutoCompleteFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "creditorName",
                label: "Creditor",
                boundaryClass: "col-6",
                queryUrl: "/spineapi/master/search-creditor?creditorName=",
            })
        ).addField(new FSelectFieldMDP({
            dataSelectorKey: "savingPercentage",
            label: "Saving Percentage",
            parentMDP: new FFormChildMDP(),
            boundaryClass: "col-6",
            options: [0,10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        }))
        // .addField(
        //     new FSelectFieldMDP({
        //         parentMDP: this.childMDP,
        //         dataSelectorKey: "creditorStatusList",
        //         label: "Creditor Status",
        //         boundaryClass: "col-4",
        //         options: Data.Spine.FICREDITOR_STATUS.list(),
        //         optionLabel: "name",
        //         optionValue: "id",
        //         multiple: true

        //     })

        // )
        .addAction(
            new FBtnMDP({
                label: "Filter",
                onClick: () => { this.parent.getAccountListForCreditor() }
            })
        )
    }

    // validateAndSubmit() {
    //     return () => {
    //         this.getMyRef().submitForm(this.parent.draftPayment());
    //     };
    // }

    getMyRef(): any {
        return this.parent.$refs[this.myRefName];
    }
}
