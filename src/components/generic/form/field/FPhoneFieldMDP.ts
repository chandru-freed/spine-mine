import FFieldMDP from "@/components/generic/form/field/FFieldMDP";
import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FNumberTextFieldMDP from "./FNumberTextFieldMDP";

export default class FPhoneFieldMDP extends FNumberTextFieldMDP {
  constructor(props: {
    parentMDP: FFormChildMDP;
    dataSelectorKey: string;
    label: string;
    type?: string;
    rules?: string;
    mandatory?: boolean;
    boundaryClass?: string;
    disabled?: boolean;
    condition?: boolean;
    mask?: string;
    unmask?: string;
    prefix?: string;
  }) {
    super({
      ...props,
      mask: "##### #####",
      unmask: "##########",
      prefix: "+91",
    });
    // this.defaultValue = defaultValue;
  }
}
