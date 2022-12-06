import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellDateMDP implements FColumnCellMDP {
    componentName: string = "FCellDateTime";
    getMetaData(): object {
        return {
            componentName: this.componentName,
        }
    }

}