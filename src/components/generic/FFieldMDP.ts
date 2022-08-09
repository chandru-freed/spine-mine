import MDP from "./MDP";

export default interface FFieldMDP extends MDP {
  dataSelectorKey: string
  label: string;
  rules: string
}


