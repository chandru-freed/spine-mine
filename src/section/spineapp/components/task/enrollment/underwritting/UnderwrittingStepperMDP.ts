import FStepperMDP from "@/components/generic/FStepperMDP";
import CCITProfileStepFFormMDP from "./../collectClientInfoTask/step1/CCITProfileStepFFormMDP";
import CCITCreditorStepMDP from "./../collectClientInfoTask/step2/CCITCreditorStepMDP";
import CCITBudgetStepMDP from "./../collectClientInfoTask/step3/CCITBudgetStepMDP";
import CCITPaymentPlanStepMDP from "./../collectClientInfoTask/step4/CCITPaymentPlanStepMDP";
import CCITBankStepFFormMDP from "./../collectClientInfoTask/step5/CCITBankStepFFormMDP";
import CCITDocumentStepMDP from "./../collectClientInfoTask/step6/CCITDocumentStepMDP";
import CCITMarkCompleteStepFFormMDP from "./../collectClientInfoTask/step7/CCITMarkCompleteStepFFormMDP";

export default class UnderwrittingStepperMDP extends FStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: "collectClientInfoStepperRef" });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this
    // .addStep({
    //   name: "Profile",
    //   stepContent: new CCITProfileStepFFormMDP({
    //     taskRoot: this.taskRoot,
    //     parent: this,
    //   }),
    // }).addStep({
    //   name: "Creditor",
    //   stepContent: new CCITCreditorStepMDP({
    //     taskRoot: this.taskRoot,
    //     parent: this,
    //   }),
    // }).addStep({
    //   name: "Budget",
    //   stepContent: new CCITBudgetStepMDP({
    //     taskRoot: this.taskRoot,
    //     parent: this,
    //   }),
    // }).addStep({
    //   name: "Payment Plan",
    //   stepContent: new CCITPaymentPlanStepMDP({
    //     taskRoot: this.taskRoot,
    //     parent: this,
    //   }),
    // }).addStep({
    //   name: "Bank",
    //   stepContent: new CCITBankStepFFormMDP({
    //     taskRoot: this.taskRoot,
    //     parent: this,
    //   }),
    // }).addStep({
    //   name: "Document",
    //   stepContent: new CCITDocumentStepMDP({
    //     taskRoot: this.taskRoot,
    //     parent: this,
    //   }),
    // })
    .addStep({
      name: "Verify",
      stepContent: new CCITMarkCompleteStepFFormMDP({
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
