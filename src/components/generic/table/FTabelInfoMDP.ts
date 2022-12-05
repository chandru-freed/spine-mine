import MDP from "../MDP";
import FTextInfoMDP from "./info/FTextInfoMDP";

export default class FTabelInfoMDP implements MDP {
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
        this.infoMDP = infoMDP || new FTextInfoMDP();
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
