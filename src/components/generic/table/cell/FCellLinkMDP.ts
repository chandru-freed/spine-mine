import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellLinkMDP implements FColumnCellMDP {
    onClick: (item: any) => any;
    linkText?: string;
    icon?: string;
    constructor({
        onClick, dataSelectorKey,linkText,
        icon
    }: { onClick: (item: any) => any, dataSelectorKey?: string;linkText?: string;icon?: string; }) {
        this.onClick = onClick;
        this.linkText = linkText;
        this.icon = icon;
    }
    // dataSelectorKey: string;
    componentName: string = "FCellLink";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                onClick: this.onClick,
                linkText: this.linkText,
                icon: this.icon
            }
        }
    }

}