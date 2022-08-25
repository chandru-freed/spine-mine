export default interface ManualTaskIntf {
    $refs: any
    taskDisabled: boolean
    gotoFile: () => void


    saveAndMarkCompleteTask: () => void
    saveTask: () => void
}