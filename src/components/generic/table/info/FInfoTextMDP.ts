import FColumnCellMDP from '../FColumnCellMDP';
export default class FInfoTextMDP implements FColumnCellMDP {
    
    componentName: string = "FInfoText";
    getMetaData(): object {
        return {
            componentName: this.componentName,
        }
    }

}