import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import AddressFMiniFormMDP from "@/components/generic/form/field/AddressFMiniFormMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FSelectDateFieldMDP from "../form/field/FDateSelectFieldMDP";

export default class FRegistrationDetailsMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    parent: any;
    constructor({ taskRoot, parent, myRefName, dataSelectorKey, disabled }: { taskRoot: any; parent: any; myRefName: string; dataSelectorKey?: string; disabled: boolean }) {
        super({
            myRefName: myRefName,
            dataSelectorKey: dataSelectorKey,
            disabled: disabled,
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this.addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "firstName",
                label: "First Name",
                mandatory: true,
                boundaryClass: "col-4"
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "middleName",
                label: "Middle Name",
                mandatory: true,
                boundaryClass: "col-4"
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "lastName",
                label: "Last Name",
                mandatory: true,
                boundaryClass: "col-4"
            })
        ).addField(
            new FEmailFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "emailId",
                boundaryClass: "col-4",
                mandatory: true
            })
        ).addField(
            new FPhoneFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "mobile",
                label: "Mobile",
                boundaryClass: "col-4",
                mandatory: true
            })
        )

    }



}
