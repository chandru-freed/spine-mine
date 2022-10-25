
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class ProfileSummaryFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    constructor() {
        super({
            myRefName: "profileSummaryFForm",

        });

        this.addField(new FTextFieldMDP({
            dataSelectorKey: "taskInput.clRegistrationDetails.fullName",
            label: "Name",
            parentMDP: this.childMDP,
            readonly: true,
            boundaryClass: "col-4"
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "taskInput.clRegistrationDetails.emailId",
            label: "Email Id",
            parentMDP: this.childMDP,
            readonly: true,
            boundaryClass: "col-4"
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "taskInput.clRegistrationDetails.mobile",
            label: "Mobile",
            parentMDP: this.childMDP,
            readonly: true,
            boundaryClass: "col-4"
        })).addField(new FSelectDateFieldMDP({
            dataSelectorKey: "taskOutput.personalInfo.dob",
            label: "DOB",
            parentMDP: this.childMDP,
            readonly: true,
            boundaryClass: "col-4"
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "taskOutput.personalInfo.pan",
            label: "PAN",
            parentMDP: this.childMDP,
            readonly: true,
            boundaryClass: "col-4"
        })).addField(new FTextFieldMDP({
            dataSelectorKey: "taskOutput.personalInfo.residentialAddress.city",
            label: "City",
            parentMDP: this.childMDP,
            readonly: true,
            boundaryClass: "col-4"
        }))
    }

}