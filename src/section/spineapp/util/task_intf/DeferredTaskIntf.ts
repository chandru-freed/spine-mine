export default interface DeferredTaskIntf {
    $refs: any
    taskDisabled: boolean
    taskFormData: any
    taskDetails: any
    gotoFile: () => void

    rescueTask: () => void
    forceCompleteTask: () => void
    proceedTask: () => void

}