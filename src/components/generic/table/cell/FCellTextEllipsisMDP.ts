import FColumnCellMDP from "../FColumnCellMDP";
export default class FCellTextEllipsisMDP implements FColumnCellMDP {
  dataSelectorKey: string | undefined;

  componentName: string = "FCellTextEllipsis";
  getMetaData(): object {
    return {
      componentName: this.componentName,
      props: {
        dataSelectorKey: this.dataSelectorKey,
      },
    };
  }
}
