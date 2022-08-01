import Vue from "vue"

export default interface CollectClientInfoTaskInf {
  $refs: any
  formDisabled: boolean
  // getStepperRef:() => any
  saveTask: () => void
  completeTask: () => void
}
