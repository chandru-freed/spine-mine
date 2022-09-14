import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import DeferredTaskIntf from "@/section/spineapp/util/task_intf/DeferredTaskIntf";

export default class CMPRTStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: DeferredTaskIntf;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: DeferredTaskIntf; parent: any }) {
        super({
            myRefName: "checkManualPaymentReceivedFormRef",
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
                boundaryClass: "col-6",
                disabled: true
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskInput.upiLink",
                label: "UPI Link",
                mandatory: true,
                boundaryClass: "col-6",
                disabled: true
            })
        )
    }
    getMyRef(): any {
        return this.parent.getMyRef().$refs[this.myRefName][0];
    }
}