import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellEmailMDP implements FColumnCellMDP {
    
    componentName: string = "FCellEmail";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
            }
        }
    }

}