import FColumnCellMDP from "../FColumnCellMDP";
export default class FCellNameMDP implements FColumnCellMDP {
  componentName: string = "FCellAccountNumber";
  getMetaData(): object {
    return {
      componentName: this.componentName,
      props: {},
    };
  }
}
