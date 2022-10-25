import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FRemoteAutoCompleteFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";

export default class ReAssignTicketFFormMDP extends FFormMDP {
    root: any;
    constructor(prop: { root: any }) {
        super({ myRefName: "addTicketFFormRef" });
        this.root = prop.root;
        this
        .addField(new FGompaUserRemoteAutoCompleteFieldMDP({
            dataSelectorKey: "assignTo",
            label: "Assign To",
            parentMDP: new FFormChildMDP(),
            boundaryClass: "col-12"
        }))
        .addField(new FTextareaMDP({
            dataSelectorKey: "comment",
            label: "Comment",
            parentMDP: new FFormChildMDP(),
            boundaryClass: "col-12"
        }))
        .addAction(new FBtnMDP({
            label: "Cancel",
            onClick: this.cancel(),
            btnType: BtnType.TEXT
        })).addAction(new FBtnMDP({
            label: "Assign",
            onClick: this.validateAndReAssign()
        }))

    }
    validateAndReAssign() {
        return () => {
            this.getMyRef().submitForm(this.reAssignTicket());
        }
    }

    getMyRef(): any {
        return this.root.$refs[this.myRefName];
    }

    reAssignTicket() {
        return () => {
            this.root.reAssignTicket();
        }
    }

    cancel() {
        return () => {
            this.root.cancelReAssignTicket();
        }
    }

}