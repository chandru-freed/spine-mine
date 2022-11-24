import MDP from "../MDP";

export default interface FColumnCellMDP extends MDP {
    dataSelectorKey?: string;
    onClick?: (item: any) => void;
}


