import MDP from "../MDP";
import FInfoTextMDP from "./info/FInfoTextMDP";

export default class FTableInfoMDP implements MDP {
    label: string = "";
    infoMDP: MDP;
    value: string | undefined;
    constructor({
        label,infoMDP,value,
    }: {
        label: string;
        infoMDP?: MDP;
        value?: string;
    }) {
        this.label = label;
        this.infoMDP = infoMDP || new FInfoTextMDP();
        this.value = value;
    }
    getMetaData(): object {
        return {
            label: this.label,
            infoMetaData: this.infoMDP.getMetaData(),
            value: this.value
        }
    }
}
