export default interface SelfTaskIntf {
    $refs: any
    taskDisabled: boolean
    taskFormData: any
    taskDetails: any
    gotoFile: () => void

    rescueTask: () => void
    forceCompleteTask: () => void
}