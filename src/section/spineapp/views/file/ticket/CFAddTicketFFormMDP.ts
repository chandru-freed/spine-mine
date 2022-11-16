import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FRemoteAutoCompleteFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";

export default class AddTicketFFormMDP extends FFormMDP {
    root: any;
    constructor(prop: { root: any }) {
        super({ myRefName: "addTicketFFormRef" });
        this.root = prop.root;
        this.addField(new FTextFieldMDP({
            dataSelectorKey: "ticketSubject",
            label: "Subject",
            parentMDP: new FFormChildMDP(),
            mandatory: true,
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "ticketType",
            label: "Category",
            parentMDP: new FFormChildMDP(),
        })).addField(new FTextareaMDP({
            dataSelectorKey: "ticketDetails",
            label: "Description",
            parentMDP: new FFormChildMDP(),
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "clientFileNumber",
            label: "Client File Number",
            parentMDP: new FFormChildMDP(),
            disabled: true
        })).addField(new FSelectFieldMDP({
            dataSelectorKey: "priority",
            label: "Priority",
            parentMDP: new FFormChildMDP(),
            options:[1,2,3,4,5]
        }))
        .addField(new FGompaUserRemoteAutoCompleteFieldMDP({
            dataSelectorKey: "assignTo",
            label: "Assign To",
            parentMDP: new FFormChildMDP(),
        })).addAction(new FBtnMDP({
            label: "Raise a Ticket",
            onClick: this.validateAndAdd()
        }))

    }
    validateAndAdd() {
        return () => {
            this.getMyRef().submitForm(this.addTicket());
        }
    }

    getMyRef(): any {
        return this.root.$refs[this.myRefName];
    }

    addTicket() {
        return () => {
            this.root.addTicket();
        }
    }

    cancel() {
        return () => {
            this.root.goBack();
        }
    }

}