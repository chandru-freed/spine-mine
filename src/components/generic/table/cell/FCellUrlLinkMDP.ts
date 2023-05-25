import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellUrlLinkMDP implements FColumnCellMDP {
    dataSelectorKey?: string;
    placeholder?: string;
    constructor({
        dataSelectorKey,
        placeholder
    }: {  dataSelectorKey?: string;placeholder?: string }) {
        this.dataSelectorKey = dataSelectorKey;
        this.placeholder = placeholder;
    }
    // dataSelectorKey: string;
    componentName: string = "FCellUrlLink";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                dataSelectorKey: this.dataSelectorKey,
                placeholder: this.placeholder
            }
        }
    }

}