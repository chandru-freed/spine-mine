export default interface EnrollmentCompletionTaskIntf {
    $refs: any
    taskDisabled: boolean
    saveAndMarkCompleteTask: () => void
    gotoFile: () => void
}