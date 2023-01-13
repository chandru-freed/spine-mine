import FColumnCellMDP from "../FColumnCellMDP";
export default class FCellStatusMDP implements FColumnCellMDP {
  componentName: string = "FCellStatus";
  outlined: boolean = false;
  colorCodeData?: any ;
  constructor({ outlined = false,colorCodeData}: { outlined?: boolean,colorCodeData?: any }) {
    this.outlined = outlined;
    this.colorCodeData = colorCodeData;
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      props: {
        outlined: this.outlined,
        colorCodeData: this.colorCodeData
      },
    };
  }
}
