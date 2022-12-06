import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellTaskMDP implements FColumnCellMDP {
    color: string | undefined;
    constructor({
         dataSelectorKey,color="green"
    }: {dataSelectorKey?: string;color?:string }) {
        this.color = color;
    }
    // dataSelectorKey: string;
    componentName: string = "FCellTask";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                color:this.color,
            }
        }
    }

}