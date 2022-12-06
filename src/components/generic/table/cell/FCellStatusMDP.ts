import FColumnCellMDP from "../FColumnCellMDP";
export default class FCellStatusMDP implements FColumnCellMDP {
  componentName: string = "FCellStatus";
  outlined: boolean = false;
  constructor({ outlined = false }: { outlined?: boolean }) {
    this.outlined = outlined;
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      props: {
        outlined: this.outlined,
      },
    };
  }
}
