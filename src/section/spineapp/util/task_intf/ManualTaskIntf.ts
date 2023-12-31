export default interface ManualTaskIntf {
    $refs: any
    taskDisabled: boolean
    taskFormData: any
    taskDetails: any
    taskId: string;
    gotoFile: () => void


    saveAndMarkCompleteTask: () => void
    saveTask: () => void
    rescueTask: () => void
    forceCompleteTask: () => void
}