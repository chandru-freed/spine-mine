export default interface SelfTaskIntf {
    $refs: any
    taskDisabled: boolean
    taskFormData: any
    gotoFile: () => void

    rescueTask: () => void
}