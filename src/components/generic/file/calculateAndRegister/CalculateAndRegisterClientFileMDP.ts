import FBtnMDP from "../../FBtnMDP";
import MDP from "../../MDP";

export default class CalculateAndRegisterClientFileMDP implements MDP {
    onCancelClick?: () => void;
    componentName: string = "CalculateAndRegisterClientFile";
    constructor(props: {onCancelClick?: () => void;root: any}) {
        this.onCancelClick = props.onCancelClick;
    }
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                onCancelClick: this.onCancelClick
            }
        }
    }

}