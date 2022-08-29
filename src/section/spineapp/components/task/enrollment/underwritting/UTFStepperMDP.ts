import FStepperMDP from "@/components/generic/FStepperMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";
import UTProfileStepFProfileFFormMDP from "./step1/UTProfileStepFProfileFFormMDP";
import UTCreditorStepFCreditorFFormMDP from "./step2/UTCreditorStepFCreditorFFormMDP";
import { UTBudgetStepFBudgetMDP } from "./step3/UTBudgetStepFBudgetMDP";
import UTPaymentPlanStepFPaymentPlanMDP from "./step4/UTPaymentPlanStepFPaymentPlanMDP";
import UTApprovedStepFFormMDP from "./step7/UTApprovedStepFFormMDP";

export default class UTFStepperMDP extends FStepperMDP {
    taskRoot: GenericTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: GenericTaskIntf }) {
      super({ myRefName: "underwrittingStepperRef" });
      this.taskRoot = taskRoot;
      this.parent = taskRoot;

      this.addStep({name:"Profile", stepContent: new UTProfileStepFProfileFFormMDP({taskRoot:taskRoot, parent:this})})      
      this.addStep({name:"Creditor", stepContent: new UTCreditorStepFCreditorFFormMDP({taskRoot:taskRoot, parent:this})})      
      this.addStep({name:"Budget", stepContent: new UTBudgetStepFBudgetMDP({taskRoot:taskRoot, parent:this})})      
      this.addStep({name:"Payment", stepContent: new UTPaymentPlanStepFPaymentPlanMDP({taskRoot:taskRoot, parent:this})})      
      this.addStep({name:"Verify", stepContent: new UTApprovedStepFFormMDP({taskRoot:taskRoot, parent:this})})   

    }
   getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}