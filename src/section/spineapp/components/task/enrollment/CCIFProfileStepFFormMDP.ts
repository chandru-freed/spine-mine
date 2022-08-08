import FFormMDP from "@/components/generic/FFormMDP";
import FTextFieldMDP from "@/components/generic/FTextFieldMDP";

export default class CCIFProfileStepFFormMDP extends FFormMDP {
  constructor() {
    super({ myRef: "testFForm" });

    this.addField(
      new FTextFieldMDP({
        dataSelector: "firstName",
        label: "First Name",
        mandatory: true,
      })
    ).addField(
      new FTextFieldMDP({ dataSelector: "lastName", label: "Last Name" })
    );
  }
}
