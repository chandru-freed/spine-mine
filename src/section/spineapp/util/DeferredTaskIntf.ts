export default interface DeferredTaskIntf {
    $refs: any
    taskDisabled: boolean
    taskFormData: any
    gotoFile: () => void

}