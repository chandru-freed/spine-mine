import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellNameMDP implements FColumnCellMDP {
    color: string | undefined;
    icon: string | undefined;
    clientId: string | undefined;
    constructor({
        dataSelectorKey,color="deep-purple",icon,
    }: { dataSelectorKey?: string;color?:string, icon?: string}) {
        this.color = color;
        this.icon = icon;
    }
    // dataSelectorKey: string;
    componentName: string = "FCellName";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                color:this.color,
                icon: this.icon,
            }
        }
    }

}