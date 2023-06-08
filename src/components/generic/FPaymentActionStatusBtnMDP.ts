import MDP from "@/components/generic/MDP";
import * as Data from "@/../src-gen/data";
import FBtnMDP from "./FBtnMDP";

export default class FPaymentActionStatusBtnMDP extends FBtnMDP {
  componentName = "FPaymentActionStatusBtn";
  elevation = 0;
  paymentId: string;
  paymentStatus: Data.ClientFile.PAYMENT_STATUS;
  constructor({
    paymentId,
    paymentStatus,
    onClick
  }: {
    paymentId: string;
    paymentStatus: Data.ClientFile.PAYMENT_STATUS;
    onClick: any;
  }) {

    super({
        label:"Check Payment",
        onClick: onClick
    })
    this.paymentStatus = paymentStatus;
    this.paymentId = paymentId;
  }
  getMetaData(): object {
    return {
      componentName: this.componentName,
      condition: this.condition,
      props: {
        onClick: this.onClick,
        outlined: this.btnType === BtnType.OUTLINED,
        text: this.btnType === BtnType.TEXT,
        elevation: this.elevation,
        color: this.color,
        disabled: this.disabled,
        paymentId: this.paymentId,
        paymentStatus: this.paymentStatus
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