import FColumnCellMDP from "../FColumnCellMDP";
export default class FCellTaskStatusMDP implements FColumnCellMDP {
  componentName: string = "FCellTaskStatus";

  getMetaData(): object {
    return {
      componentName: this.componentName,
    };
  }
}
