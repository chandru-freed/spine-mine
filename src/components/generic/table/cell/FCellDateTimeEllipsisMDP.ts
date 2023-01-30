import FColumnCellMDP from "../FColumnCellMDP";
export default class FCellDateTimeEllipsisMDP implements FColumnCellMDP {
  componentName: string = "FCellDateTimeEllipsis";
  getMetaData(): object {
    return {
      componentName: this.componentName,
    };
  }
}
