
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

import ManualTaskIntf from "@/section/spineapp/util/ManualTaskIntf";

export default class ReceivePaymentFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: ManualTaskIntf;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: ManualTaskIntf; parent: any }) {
        super({
            myRefName: "receivePaymentFormRef",
            disabled: taskRoot.taskDisabled,
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this.addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "fileId",
                label: "File Id",
                boundaryClass: "col-12",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "fileId",
                label: "Amount Received",
                boundaryClass: "col-12",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "upiId",
                label: "UPI Id",
                boundaryClass: "col-12",
            })
        ).addField(
            new FTextFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "intent",
                label: "Intent",
                boundaryClass: "col-12",
            })
        )
    }

    getMyRef(): any {
        return this.parent.getMyRef().$refs[this.myRefName][0];
    }

    validateAndSubmit() {
        return () => {
            this.getMyRef().submitForm(this.saveTask());
        };
    }

    validateAndMarkComplete() {
        return () => {
            this.getMyRef().submitForm(this.saveAndMarkCompleteTask());
        };
    }

    saveAndMarkCompleteTask() {
        return () => {
            this.taskRoot.saveAndMarkCompleteTask();
        };
    }

    saveTask() {
        return () => {
            this.taskRoot.saveTask();
        };
    }
}