import FColumnCellMDP from "../FColumnCellMDP";
export default class FCellDateTimeMDP implements FColumnCellMDP {
  componentName: string = "FCellDateTime";
  getMetaData(): object {
    return {
      componentName: this.componentName,
    };
  }
}
