export default interface SelfTaskIntf {
    $refs: any
    taskDisabled: boolean
    gotoFile: () => void

    rescueTask: () => void
}