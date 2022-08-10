import FFormMDP from "@/components/generic/FFormMDP";
import FStepperMDP from "@/components/generic/FStepperMDP";
import FTextFieldMDP from "@/components/generic/FTextFieldMDP";
import CCIFProfileStepFFormMDP from "./CCIFProfileStepFFormMDP";
import CCITCreditorStepMDP from "./CCITCreditorStepMDP";

export default class CCITFStepperMDP extends FStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: "collectClientInfoStepperRef" });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Profile",
      stepContent: new CCIFProfileStepFFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
      }),
    }).addStep({
      name: "Creditor",
      stepContent: new CCITCreditorStepMDP({
        taskRoot: this.taskRoot,
        parent: this,
        myRefName: "creditorListRef",
        dataSelectorKey: "creditorList",
      }),
    });
  }

  getMyRef() {
    return this.parent.$refs[this.myRefName];
  }
}
