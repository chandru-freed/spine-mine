import FColumnCellMDP from '../FColumnCellMDP';
export class FColumnBtnMDP implements FColumnCellMDP {
    onClick: (item: any) => any;
    color: string | undefined;
    constructor({
        onClick, dataSelectorKey,color="green"
    }: { onClick: (item: any) => any;dataSelectorKey?: string;color?:string }) {
        this.onClick = onClick;
        this.color = color;
    }
    // dataSelectorKey: string;
    componentName: string = "FColumnBtn";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                onClick: this.onClick,
                color:this.color
            }
        }
    }

}