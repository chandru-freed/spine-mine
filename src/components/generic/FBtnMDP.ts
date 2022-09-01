import MDP from "@/components/generic/MDP";

export default class FBtnMDP implements MDP {
  componentName = "FBtn";
  label: string;
  onClick: () => void;
  color: BtnColor;
  elevation = 0;
  btnType: BtnType;
  condition: boolean
  constructor({
    label,
    onClick,
    color = BtnColor.PRIMARY,
    btnType = BtnType.OUTLINED,
    condition = true
  }: {
    label: string;
    onClick: () => void;
    color?: BtnColor;
    btnType?: BtnType;
    condition?: boolean
  }) {
    this.label = label;
    this.onClick = onClick;
    this.color = color;
    this.btnType = btnType;
    this.condition = condition
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