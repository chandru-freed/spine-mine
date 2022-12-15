import FColumnCellMDP from '../FColumnCellMDP';
export default class FInfoINRMDP implements FColumnCellMDP {
    rounded: boolean = false;
    componentName: string = "FInfoINR";

    constructor(props: {rounded?: boolean}) {
        this.rounded = props.rounded || false;
    }
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                rounded: this.rounded
            }
        }
    }

}