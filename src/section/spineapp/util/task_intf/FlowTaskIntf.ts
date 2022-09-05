export default interface FlowTaskIntf {
    $refs: any
    taskDisabled: boolean
    taskFormData: any
    taskDetails: any
    gotoFile: () => void

    rescueTask: () => void
    forceCompleteTask: () => void
}