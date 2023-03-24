import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellRouterLinkMDP implements FColumnCellMDP {
    
    componentName: string = "FCellRouterLink";
    routerName: string;
    paramName?: string;
    color?: string;
    icon?: string;
    paramKey?: string;
    constructor(props: {
        routerName: string;
        paramName?:string,
        color?: string;
        icon?: string;
        paramKey?: string;
    }) {
        this.routerName = props.routerName;
        this.paramName = props.paramName;
        this.color = props.color;
        this.icon = props.icon;
        this.paramKey = props.paramKey;
    }
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                routerName: this.routerName,
                paramName: this.paramName,
                color:this.color,
                icon: this.icon,
                paramKey: this.paramKey
            }
        }
    }

}