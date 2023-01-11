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

export default class TicketSummaryFFormMDP extends FFormMDP {
    root: any;
    constructor(prop: { root: any }) {
        super({ myRefName: "addTicketFFormRef", readonly: true, disabled: true });
        this.root = prop.root;
        this.addField(new FTextFieldMDP({
            dataSelectorKey: "taskInput.subject",
            label: "Subject",
            parentMDP: new FFormChildMDP(),
            mandatory: true,
            boundaryClass:"col-4",
            readonly: true
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "taskInput.category",
            label: "Category",
            parentMDP: new FFormChildMDP(),
            boundaryClass:"col-4",
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "taskInput.ticketNumber",
            label: "Ticket Number",
            parentMDP: new FFormChildMDP(),
            boundaryClass:"col-4",
        })).addField(new FTextareaMDP({
            dataSelectorKey: "taskInput.ticketDetails",
            label: "Description",
            parentMDP: new FFormChildMDP(),
        })).addField(new FSelectDateFieldMDP({
            dataSelectorKey: "sla",
            label: "SLA",
            parentMDP: new FFormChildMDP(),
            boundaryClass:"col-4"
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "clientFile.clientFileNumber",
            label: "Client File Number",
            boundaryClass:"col-4",
            parentMDP: new FFormChildMDP(),
            condition: this.showClientFileNumberField()
        }));
    }

    showClientFileNumberField(): boolean {
        return this.root.taskSummary.clientFile !== undefined
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