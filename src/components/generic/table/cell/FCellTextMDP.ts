import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellTextMDP implements FColumnCellMDP {
    
    dataSelectorKey: string | undefined;
    constructor({
        dataSelectorKey
    }: {  dataSelectorKey?: string }) {
        this.dataSelectorKey = dataSelectorKey;
    }
    componentName: string = "FCellText";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                dataSelectorKey: this.dataSelectorKey,
            }
        }
    }

}