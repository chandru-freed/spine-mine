import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellBlankMDP implements FColumnCellMDP {
    componentName: string = "FCellBlank";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {

            }
        }
    }

}