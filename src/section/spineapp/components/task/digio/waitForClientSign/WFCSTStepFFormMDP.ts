import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

import DeferredTaskIntf from "@/section/spineapp/util/task_intf/DeferredTaskIntf";


export default class WFCSTStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: DeferredTaskIntf;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: DeferredTaskIntf; parent: any }) {
        super({
            myRefName: "waitForClientSignFormRef",
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
                boundaryClass: "col-4",
                disabled: true
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskInput.templateCode",
                label: "Template Code",
                mandatory: true,
                boundaryClass: "col-4",
                disabled: true
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "taskInput.docId",
                label: "Doc Id",
                mandatory: true,
                boundaryClass: "col-4",
                disabled: true
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