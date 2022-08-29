export interface GenericTaskIntf {
    $refs: any
    taskFormData: any
    taskDisabled: boolean
    saveAndMarkCompleteTask: () => void
    saveTask: () => void
    gotoFile: () => void
}