import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class AmendmentFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "amendmentFFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addAction(
        new FBtnMDP({
          label: "CREATE REQUEST",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.createWelcomeCall());
    };
  }

  createWelcomeCall() {
    return () => {
      this.taskRoot.createWelcomeCall();
    };
  }
}
