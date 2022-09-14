import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import DeferredTaskIntf from "@/section/spineapp/util/task_intf/DeferredTaskIntf";

export default class NSPACDTStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: DeferredTaskIntf;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: DeferredTaskIntf; parent: any }) {
        super({
            myRefName: "nsfSPAClientDeferredFormRef",
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
            new FNumberFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskInput.clientDeferredTime",
                label: "Client Deferred Time",
                boundaryClass: "col-6",
                disabled: true
            })
        );
    }
}