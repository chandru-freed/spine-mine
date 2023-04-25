import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellBtnPreviewMDP implements FColumnCellMDP {
    onClick: (item: any) => any;
    color: string | undefined;
    icon: string | undefined;
    constructor({
        onClick, dataSelectorKey,color="green",icon
    }: { onClick: (item: any) => any;dataSelectorKey?: string;color?:string, icon?: string }) {
        this.onClick = onClick;
        this.color = color;
        this.icon = icon;
    }
    // dataSelectorKey: string;
    componentName: string = "FCellBtnPreview";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                onClick: this.onClick,
                color:this.color,
                icon: this.icon
            }
        }
    }

}