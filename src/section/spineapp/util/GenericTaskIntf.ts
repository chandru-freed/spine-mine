export interface GenericTaskIntf {
    $refs: any
    taskDisabled: boolean
    saveAndMarkCompleteTask: () => void
    saveTask: () => void
    gotoFile: () => void
}