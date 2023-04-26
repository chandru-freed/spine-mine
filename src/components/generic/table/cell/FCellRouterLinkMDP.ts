import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellRouterLinkMDP implements FColumnCellMDP {
    
    componentName: string = "FCellRouterLink";
    routerName: string;
    paramName?: string;
    color?: string;
    icon?: string;
    paramKey?: string;
    paramsList?:Param[];
    constructor(props: {
        routerName: string;
        paramName?:string,
        color?: string;
        icon?: string;
        paramKey?: string;
        paramsList?:Param[];
    }) {
        this.routerName = props.routerName;
        this.paramName = props.paramName;
        this.color = props.color;
        this.icon = props.icon;
        this.paramKey = props.paramKey;
        this.paramsList = props.paramsList;
    }
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                routerName: this.routerName,
                paramName: this.paramName,
                color:this.color,
                icon: this.icon,
                paramKey: this.paramKey,
                paramsList: this.paramsList
            }
        }
    }

}

export interface Param {
    paramName: string;
    paramKey: string;
}