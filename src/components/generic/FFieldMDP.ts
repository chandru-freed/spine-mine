import MDP from "./MDP";

export default interface FFieldMDP extends MDP {
  dataSelector: string
  label: string;
  rules: string
}


