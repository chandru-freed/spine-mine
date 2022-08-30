export default interface FlowTaskIntf {
    $refs: any
    taskDisabled: boolean
    taskFormData: any
    rescueTask: () => void
    gotoFile: () => void
}