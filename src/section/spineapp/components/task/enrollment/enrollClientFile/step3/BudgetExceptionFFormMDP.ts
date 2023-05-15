import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FBtnMDP, { BtnColor } from "@/components/generic/FBtnMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FSnackbar from "@/fsnackbar";
export default class UpdateExceptionTakenFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    parent: any;
    taskRoot: any;
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({ myRefName: "UpdateExceptionTakenRef" });
        this.parent = parent;
        this.taskRoot = taskRoot;
        this

            .addField(
                new FTextareaMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "noteMessage",
                    label: "Reason for taking exception",
                    mandatory :true
                })
            )
            .addAction(new FBtnMDP({
                label: "Take Exception",
                onClick: () => this.validateAndSubmit(),
                color: BtnColor.SECONADRY
            }))
    }


    getMyRef() {
        return this.parent.$refs[this.myRefName];
    }

    validateAndSubmit() {
        console.log(this.getMyRef(), "this.getMyRef()")
        this.getMyRef().submitForm(() => {
            this.parent.updateExceptionTaken();
        });

    }
}
