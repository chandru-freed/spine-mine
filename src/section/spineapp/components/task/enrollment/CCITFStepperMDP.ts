import FFormMDP from "@/components/generic/FFormMDP";
import FStepperMDP from "@/components/generic/FStepperMDP";
import FTextFieldMDP from "@/components/generic/FTextFieldMDP";
import CCIFProfileStepFFormMDP from "./CCIFProfileStepFFormMDP";

export default class CCITFStepperMDP extends FStepperMDP {
  constructor() {
    super({ myRef: "collectClientInfoStepperRef" });

    this.addStep("Profile", new CCIFProfileStepFFormMDP());
  }
}
