import FFieldMDP from "@/components/generic/form/field/FFieldMDP";
import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FNumberFieldMDP from "./FNumberFieldMDP";

export default class FAccountFieldMDP extends FNumberFieldMDP {
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
    prefix?: string;
  }) {
    super({
      ...props,
    });
  }
}
