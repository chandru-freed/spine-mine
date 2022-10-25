import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FRemoteAutoCompleteFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";

export default class TicketSummaryFFormMDP extends FFormMDP {
    root: any;
    constructor(prop: { root: any }) {
        super({ myRefName: "addTicketFFormRef", readonly: true, disabled: true });
        this.root = prop.root;
        this.addField(new FTextFieldMDP({
            dataSelectorKey: "ticketSubject",
            label: "Subject",
            parentMDP: new FFormChildMDP(),
            mandatory: true,
            boundaryClass:"col-3",
            readonly: true
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "ticketType",
            label: "Category",
            parentMDP: new FFormChildMDP(),
            boundaryClass:"col-3",
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "clientFileNumber",
            label: "Client File Number",
            boundaryClass:"col-3",
            parentMDP: new FFormChildMDP(),
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "ticketNumber",
            label: "Ticket Number",
            parentMDP: new FFormChildMDP(),
            boundaryClass:"col-3",
        })).addField(new FTextareaMDP({
            dataSelectorKey: "ticketDetails",
            label: "Description",
            parentMDP: new FFormChildMDP(),
        }));
        

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