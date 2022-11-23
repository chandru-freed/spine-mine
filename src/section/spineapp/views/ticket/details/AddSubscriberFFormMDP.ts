import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FRemoteAutoCompleteFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FRemoteComboBoxFieldMDP from "@/components/generic/form/field/FRemoteComboBoxFieldMDP";

export default class AddSubscriberFFormMDP extends FFormMDP {
    root: any;
    constructor(prop: { root: any }) {
        super({ myRefName: "addTicketFFormRef" });
        this.root = prop.root;
        this.addField(new FGompaUserRemoteAutoCompleteFieldMDP({
            dataSelectorKey: "subscriberList",
            label: "Subscriber List",
            parentMDP: new FFormChildMDP(),
            boundaryClass:"col-12",
            multiple: true,
            smallChips: true,
            clearable: false
        }))
        
        .addAction(new FBtnMDP({
            label: "Cancel",
            onClick: this.cancel(),
            btnType: BtnType.TEXT
        })).addAction(new FBtnMDP({
            label: "Add Subscriber List",
            onClick: this.validateAndAdd()
        }))

    }
    validateAndAdd() {
        return () => {
            this.getMyRef().submitForm(this.addSubscriber());
        }
    }

    getMyRef(): any {
        return this.root.$refs[this.myRefName];
    }

    addSubscriber() {
        return () => {
            this.root.addSubscriber();
        }
    }

    cancel() {
        return () => {
            this.root.closeAndClearAllForms();
        }
    }

}