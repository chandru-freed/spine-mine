export interface CollectClientInfoTaskIntf {
    $refs: any
    taskDisabled: boolean
    saveAndMarkCompleteTask: () => void
    saveTask: () => void
    gotoFile: () => void
}