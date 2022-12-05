import FColumnCellMDP from '../FColumnCellMDP';
export default class FTextInfoMDP implements FColumnCellMDP {
    
    componentName: string = "FTextInfo";
    getMetaData(): object {
        return {
            componentName: this.componentName,
        }
    }

}