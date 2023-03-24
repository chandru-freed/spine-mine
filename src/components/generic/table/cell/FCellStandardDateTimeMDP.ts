import FColumnCellMDP from "../FColumnCellMDP";
export default class FCellStandardDateTimeMDP implements FColumnCellMDP {
  componentName: string = "FCellStandardDateTime";
  getMetaData(): object {
    return {
      componentName: this.componentName,
    };
  }
}
