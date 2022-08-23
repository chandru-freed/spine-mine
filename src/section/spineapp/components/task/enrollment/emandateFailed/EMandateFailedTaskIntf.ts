export default interface EMandateFailedTaskIntf {
    $refs: any
    taskDisabled: boolean
    saveAndMarkCompleteTask: () => void
    saveTask: () => void
    gotoFile: () => void
}