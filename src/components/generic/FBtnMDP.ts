import MDP from "@/components/generic/MDP";

export default class FBtnMDP implements MDP {
  componentName = "FBtn";
  label: string;
  onClick: () => void;
  color: BtnColor;
  elevation = 0;
  btnType: BtnType;
  condition: boolean;
  disabled: boolean;
  constructor({
    label,
    onClick,
    color = BtnColor.PRIMARY,
    btnType = BtnType.OUTLINED,
    condition = true,
    disabled=false
  }: {
    label: string;
    onClick: () => void;
    color?: BtnColor;
    btnType?: BtnType;
    condition?: boolean;
    disabled?:boolean;
  }) {
    this.label = label;
    this.onClick = onClick;
    this.color = color;
    this.btnType = btnType;
    this.condition = condition
    this.disabled = disabled;
  }
  getMetaData(): object {
    return {
      componentName: this.componentName,
      condition: this.condition,
      props: {
        label: this.label,
        onClick: this.onClick,
        outlined: this.btnType === BtnType.OUTLINED,
        text: this.btnType === BtnType.TEXT,
        elevation: this.elevation,
        color: this.color,
        disabled: this.disabled
      },
    };
  }
}

export enum BtnType {
  TEXT = "TEXT",
  OUTLINED = "OUTLINED",
  FILLED = "FILLED",
}

export enum BtnColor {
    PRIMARY = "primary",
    SECONADRY = "secondary",
  }