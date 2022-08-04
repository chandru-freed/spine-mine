
import FStepper from "@/components/FStepper.vue";
import FStepperMDP from "@/components/FStepperMDP";
import CollectClientInfoTaskFStepperMDP from "./CollectClientInfoTaskFStepperMDP";
import CollectClientInfoTaskStep1MDP from "./step1/CollectClientInfoTaskStep1MDP";
import CollectClientInfoTaskStep2MDP from "./step2/CollectClientInfoTaskStep2MDP";
import CollectClientInfoTaskStep2 from "./step2/CollectClientInfoTaskStep2.vue";
import CollectClientInfoTaskStep3MDP from "./step3/CollectClientInfoTaskStep3MDP";


export {
  FStepper,
  FStepperMDP,
  CollectClientInfoTaskFStepperMDP,
  CollectClientInfoTaskStep1MDP,
  CollectClientInfoTaskStep2MDP,
  CollectClientInfoTaskStep2,
  CollectClientInfoTaskStep3MDP
}

export interface CollectClientInfoTaskIntf {
  $refs: any
  formDisabled: boolean
  saveTask: () => void
  completeTask: () => void
}
