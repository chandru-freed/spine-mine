import FStepperMDP from "@/components/generic/FStepperMDP";
import CCIFProfileStepFFormMDP from "./step1/CCIFProfileStepFFormMDP";
import CCITCreditorStepMDP from "./step2/CCITCreditorStepMDP";
import CCITBudgetStepMDP from "./step3/CCITBudgetStepMDP";
import CCITPaymentPlanStepMDP from "./step4/CCITPaymentPlanStepMDP";

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
      }),
    }).addStep({
      name: "Budget",
      stepContent: new CCITBudgetStepMDP({
        taskRoot: this.taskRoot,
        parent: this,
      }),
    }).addStep({
      name: "Payment Plan",
      stepContent: new CCITPaymentPlanStepMDP({
        taskRoot: this.taskRoot,
        parent: this,
      }),
    });
  }

  getMyRef() {
    console.log(this.parent.$refs);
    return this.taskRoot.$refs[this.myRefName];
  }
}
