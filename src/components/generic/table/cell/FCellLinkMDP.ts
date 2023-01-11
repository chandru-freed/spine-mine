import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellLinkMDP implements FColumnCellMDP {
    onClick: (item: any) => any;
    constructor({
        onClick, dataSelectorKey
    }: { onClick: (item: any) => any, dataSelectorKey?: string }) {
        this.onClick = onClick;
    }
    // dataSelectorKey: string;
    componentName: string = "FCellLink";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                onClick: this.onClick,
            }
        }
    }

}