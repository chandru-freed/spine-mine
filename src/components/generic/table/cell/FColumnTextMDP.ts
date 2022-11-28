import FColumnCellMDP from '../FColumnCellMDP';
export class FColumnTextMDP implements FColumnCellMDP {
    
    dataSelectorKey: string | undefined;
    constructor({
        dataSelectorKey
    }: {  dataSelectorKey?: string }) {
        this.dataSelectorKey = dataSelectorKey;
    }
    componentName: string = "FColumnText";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                dataSelectorKey: this.dataSelectorKey,
            }
        }
    }

}