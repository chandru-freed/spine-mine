import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellCopyMDP implements FColumnCellMDP {
    dataSelectorKeyToCopy?: string;
    tooltipText?: string;
    onClick: (item: any) => any;
    constructor({
        dataSelectorKey,dataSelectorKeyToCopy,tooltipText
    }: { dataSelectorKey?: string,dataSelectorKeyToCopy?: string,tooltipText?: string }) {
        this.dataSelectorKeyToCopy = dataSelectorKeyToCopy;
        this.tooltipText = tooltipText;
    }
    // dataSelectorKey: string;
    componentName: string = "FCellCopy";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                onClick: this.onClick,
                dataSelectorKeyToCopy: this.dataSelectorKeyToCopy,
                tooltipText: this.tooltipText
            }
        }
    }

}