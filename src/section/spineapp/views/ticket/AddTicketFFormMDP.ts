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

export default class AddTicketFFormMDP extends FFormMDP {
    root: any;
    constructor(prop: { root: any }) {
        super({ myRefName: "addTicketFFormRef" });
        this.root = prop.root;
        this.addField(new FTextFieldMDP({
            dataSelectorKey: "subject",
            label: "Subject",
            parentMDP: new FFormChildMDP(),
            mandatory: true,
            boundaryClass:"col-6"
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "category",
            label: "Category",
            boundaryClass:"col-6",
            parentMDP: new FFormChildMDP(),
        })).addField(new FTextareaMDP({
            dataSelectorKey: "ticketDetails",
            label: "Description",
            parentMDP: new FFormChildMDP(),
        })).addField(new FRemoteAutoCompleteFieldMDP({
            dataSelectorKey: "clientFileId",
            label: "Client File",
            parentMDP: new FFormChildMDP(),
            queryUrl: "/spineapi/clientfile/search-client-file?clientFileNumberContains=",
            itemText: "clientFileNumber",
            itemValue: "clientFileId",
            boundaryClass:"col-4",
        }))
        .addField(new FGompaUserRemoteAutoCompleteFieldMDP({
            dataSelectorKey: "assignTo",
            label: "Assign To",
            parentMDP: new FFormChildMDP(),
            boundaryClass:"col-4",
        }))
        .addField(new FSelectFieldMDP({
            dataSelectorKey: "priority",
            label: "Priority",
            parentMDP: new FFormChildMDP(),
            options:[1,2,3,4,5],
            boundaryClass:"col-4",
        }))
        .addField(new FSelectDateFieldMDP({
            dataSelectorKey: "sla",
            label: "SLA",
            parentMDP: new FFormChildMDP(),
            boundaryClass:"col-4",
        }))
        .addField(new FGompaUserRemoteAutoCompleteFieldMDP({
            dataSelectorKey: "subscriberList",
            label: "Subscriber List",
            parentMDP: new FFormChildMDP(),
            boundaryClass:"col-4",
            multiple: true,
            smallChips: true,
            clearable: false
        }))
        
        .addAction(new FBtnMDP({
            label: "Cancel",
            onClick: this.cancel(),
            btnType: BtnType.TEXT
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