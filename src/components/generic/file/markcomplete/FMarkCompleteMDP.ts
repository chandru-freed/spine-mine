import MDP from "@/components/generic/MDP";
import FBtnMDP from "../../FBtnMDP";

export default class FMarkCompleteMDP implements MDP {
    componentName: string = "FMarkComplete";
    actionList: FBtnMDP[] = [];
    constructor() {
    }

    addAction(newAction: FBtnMDP) {
        this.actionList.push(newAction);
        console.log(this.actionList)
        return this;
    }
    getMetaData(): object {
        console.log(this.actionList,"Action list")
        return {
            componentName: this.componentName,
            props: {
                actionMetaDataList: this.actionList.map((action) =>
                action.getMetaData()
            ),
            }
        }
    }



}

