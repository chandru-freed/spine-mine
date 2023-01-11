import MDP from "../MDP";

export default interface FColumnCellMDP extends MDP {
    onClick?: (item: any) => void;
}


