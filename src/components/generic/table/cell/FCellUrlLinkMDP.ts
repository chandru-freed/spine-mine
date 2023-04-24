import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellUrlLinkMDP implements FColumnCellMDP {
    dataSelectorKey?: string;
    constructor({
        dataSelectorKey
    }: {  dataSelectorKey?: string }) {
        this.dataSelectorKey = dataSelectorKey;
    }
    // dataSelectorKey: string;
    componentName: string = "FCellUrlLink";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                dataSelectorKey: this.dataSelectorKey
            }
        }
    }

}