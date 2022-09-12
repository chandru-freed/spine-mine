import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

export default class CCITProfileMDP implements MDP {
    componentName = "CCITProfile";
    taskRoot: ManualTaskIntf;
    parent: any;
    myRefName: string;
    dataSelectorKey: string | undefined;

    formList: FFormMDP[] = [];

    actionList: FBtnMDP[] = [];
    disabled: boolean;

    constructor({ taskRoot, parent, myRefName, dataSelectorKey, disabled }: { taskRoot: ManualTaskIntf; parent: any; myRefName: string; dataSelectorKey?: string | undefined; disabled: boolean }) {
        this.taskRoot = taskRoot;
        this.parent = parent;
        this.myRefName = myRefName;
        this.dataSelectorKey = dataSelectorKey;
        this.disabled = disabled;

    }

    addAction(newAction: FBtnMDP) {
        this.actionList.push(newAction);
        return this;
    }

    addForm(newForm: FFormMDP) {
        this.formList.push(newForm);
        return this;
    }


    getMetaData(): object {
        return {
            componentName: this.componentName,
            myRefName: this.myRefName,
            dataSelectorKey: this.dataSelectorKey,
            props: {
                actionMetaDataList: this.actionList.map((action) =>
                    action.getMetaData()
                ),
                formMetaDataList: this.formList.map((form) =>
                    form.getMetaData()
                ),
                disabled: this.disabled,
            },
        };
    }

}