export default interface WaitForClientSignTaskIntf {
    $refs: any
    taskDisabled: boolean
    saveAndMarkCompleteTask: () => void
    saveTask: () => void
    gotoFile: () => void
}