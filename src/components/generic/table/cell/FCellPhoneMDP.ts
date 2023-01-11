import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellPhoneMDP implements FColumnCellMDP {
    
    componentName: string = "FCellPhone";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
            }
        }
    }

}