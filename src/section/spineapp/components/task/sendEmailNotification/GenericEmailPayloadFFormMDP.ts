import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import AddressFMiniFormMDP from "@/components/generic/form/field/AddressFMiniFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";

export default class GenericEmailPayloadFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "genericEmailPayloadFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "subject",
        label: "Subject",
        mandatory: true,
      })
    )
      .addField(
        new FTextareaMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "messageBody",
          label: "Message",
          mandatory: true,
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Send Email",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.SendEmail());
    };
  }

  SendEmail() {
    return () => {
      this.taskRoot.SendEmail();
    };
  }
}
