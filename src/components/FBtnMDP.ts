import { MDP } from "./MDP";

export default class FBtnMDP implements MDP {
  // FIXED
  componentName = "FBtn";
  padding = "px-2"; //todo: needs to come from form
  // MANDATORY
  id: string;
  label: string;
  // OPTIONAL with Default
  colWidth: number;
  disabled: boolean;
  outlined: boolean;
  color: string;
  onClick: () => void;

  constructor({
    id,
    label,
    disabled = false,
    outlined = false,
    color = "primary",
    onClick,
  }: {
    id: string;
    label: string;
    disabled?: boolean;
    outlined?: boolean;
    color?: string;
    onClick: () => void;
  }) {
    this.id = id;
    this.label = label;
    this.disabled = disabled;
    this.outlined = outlined;
    this.color = color;
    this.onClick = onClick;
  }

  getBoundaryClass() {
    return `col-${this.colWidth} text-center`;
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      boundaryClass: this.getBoundaryClass(),
      props: {
        label: this.label,
        disabled: this.disabled,
        outlined: this.outlined,
        color: this.color,
        onClick: this.onClick,
      },
    };
  }
}

