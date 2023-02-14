import FBtnMDP from "@/components/generic/FBtnMDP";
import MDP from "@/components/generic/MDP";



export default class FAgreementListMDP implements MDP {
    componentName: string = "FAgreementList";
    actionList: FBtnMDP[] = [];
    taskRoot: any;
    parent: any;
    constructor({ taskRoot, parent }:{ taskRoot: any, parent: any }) {
        this.taskRoot = taskRoot;
        this.parent = parent;
    }

    addAction(newAction: FBtnMDP) {
        this.actionList.push(newAction);
        return this;
    }

    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                actionMetaDataList: this.actionList.map((action) =>
                    action.getMetaData(),
                ),
            }
        }
    }



}

