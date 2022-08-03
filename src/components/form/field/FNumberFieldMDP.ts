import { MDP } from "@/components/MDP";
import { FFormChildMDP } from "../FFormMDP";
import FTextFieldMDP from "./FTextFieldMDP";

export default class FNumberFieldMDP extends FTextFieldMDP {
  componentName = "FNumberField";
  type = "number";


  getMetaData(): object {
    return {
      componentName: this.componentName,
      rules: this.getRules(),
      boundaryClass: this.getBoundaryClass(),
      props: {
        key: this.dataSelectorKey,
        type: this.type,
        name: this.dataSelectorKey, // todo: check the name functionalities
        label: this.label,
        disabled: this.disabled,
        outlined: this.parentMDP.outlined,
        dense: this.parentMDP.dense,
        mask: this.mask,
        onChange: this.onChange,
      },
    };
  }
}
