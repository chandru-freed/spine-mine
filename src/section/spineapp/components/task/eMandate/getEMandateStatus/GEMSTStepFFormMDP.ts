import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import SelfTaskIntf  from "@/section/spineapp/util/task_intf/SelfTaskIntf";


export default class GEMSTStepFFormMDP extends FFormMDP {
    taskRoot: SelfTaskIntf
    parent: any
    childMDP = new FFormChildMDP();
    constructor({ taskRoot, parent }: { taskRoot: SelfTaskIntf, parent: any }) {
        super({
            myRefName: 'getEMandateStatusFormRef',
            disabled: taskRoot.taskDisabled
        })
        this.taskRoot = taskRoot
        this.parent = parent

        this.addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskInput.eMandateId",
                label: "EMandate Id",
                mandatory: true,
                boundaryClass: "col-6",
                readonly: true
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskInput.eMandateLink",
                label: "EMandate Link",
                mandatory: true,
                boundaryClass: "col-6",
                readonly: true
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.eMandateStatus",
                label: "EMandate Status",
                mandatory: true,
                boundaryClass: "col-6",
                readonly: true
            })
        ).addAction(
            new FBtnMDP({
                label: "Rescue",
                onClick: this.validateAndSubmit(),
            })
        )
    }
    getMyRef(): any {
        return this.parent.getMyRef().$refs[this.myRefName][0];
    }

    validateAndSubmit() {
        return () => {
            this.getMyRef().submitForm(this.rescueTask());
        };
    }


    rescueTask() {
        return () => {
            this.taskRoot.rescueTask();
        };
    }

}