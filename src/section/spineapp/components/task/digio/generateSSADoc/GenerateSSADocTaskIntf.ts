export default interface GenerateSSADocTaskIntf {
  $refs: any;
  taskDisabled: boolean;
  saveAndMarkCompleteTask: () => void;
  saveTask: () => void;
  gotoFile: () => void;
}
