import FFieldMDP from "@/components/generic/form/field/FFieldMDP";
import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "./FTextFieldMDP";

export default class FNumberTextFieldMDP extends FTextFieldMDP {
  componentName = "FNumberTextField";

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
    super({ ...props });
  }
}
