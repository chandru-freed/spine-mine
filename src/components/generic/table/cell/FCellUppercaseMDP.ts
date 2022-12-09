import FColumnCellMDP from "../FColumnCellMDP";
export default class FCellUppercaseMDP implements FColumnCellMDP {
  dataSelectorKey: string | undefined;

  componentName: string = "FCellUppercase";
  getMetaData(): object {
    return {
      componentName: this.componentName,
      props: {
        dataSelectorKey: this.dataSelectorKey,
      },
    };
  }
}
