
import FStepper from "@/components/FStepper.vue";
import FStepperMDP from "@/components/FStepperMDP";
import CollectClientInfoTaskStep1MDP from "./CollectClientInfoTaskStep1MDP";
import CollectClientInfoTaskStep2MDP from "./CollectClientInfoTaskStep2MDP";
import CollectClientInfoTaskStep2 from "./CollectClientInfoTaskStep2.vue";
import CollectClientInfoTaskFStepperMDP from "./CollectClientInfoTaskFStepperMDP";


export {
  FStepper,
  FStepperMDP,
  CollectClientInfoTaskFStepperMDP,
  CollectClientInfoTaskStep1MDP,
  CollectClientInfoTaskStep2MDP,
  CollectClientInfoTaskStep2
}

export interface CollectClientInfoTaskInf {
  $refs: any
  formDisabled: boolean
  saveTask: () => void
  completeTask: () => void
}
