export default interface ManualTaskIntf {
    $refs: any
    taskDisabled: boolean
    taskFormData: any
    gotoFile: () => void


    saveAndMarkCompleteTask: () => void
    saveTask: () => void
}