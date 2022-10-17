import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";

export default class SEMLTStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: SelfTaskIntf;
    parent: any;

    constructor({ taskRoot, parent }: { taskRoot: SelfTaskIntf, parent: any }) {
        super({
            myRefName: "sendEMandateLinkFormRef",
            disabled: taskRoot.taskDisabled,
        });

        this.taskRoot = this.taskRoot;
        this.parent = parent;

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
                label: "EMandateLink Id",
                mandatory: true,
                boundaryClass: "col-6",
                readonly: true
            })
        ).addAction(
            new FBtnMDP({
                label: "Rescue",
                onClick: this.rescueTask(),
            })
        );
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