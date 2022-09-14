import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";

export default class CEMTStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: SelfTaskIntf;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: SelfTaskIntf; parent: any }) {
        super({
            myRefName: "createEMandateFormRef",
            disabled: taskRoot.taskDisabled,
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this.addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskInput.clientFileNumber",
                label: "File Number",
                mandatory: true,
                boundaryClass: "col-12",
                disabled: true
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.eMandateLink",
                label: "EMandate Link",
                mandatory: true,
                boundaryClass: "col-6",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskOutput.eMandateId",
                label: "EMandate Id",
                mandatory: true,
                boundaryClass: "col-6",
            })
        ).addAction(
            new FBtnMDP({
                label: "Rescue",
                onClick: this.rescueTask(),
            })
        )
    }

    getMyRef(): any {
        return this.parent.getMyRef().$refs[this.myRefName][0];
    }

    rescueTask() {
        return () => {
            this.taskRoot.rescueTask();
        };
    }
}