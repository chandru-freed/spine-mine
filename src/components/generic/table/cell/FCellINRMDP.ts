import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellINRMDP implements FColumnCellMDP {
    rounded: boolean | undefined;
    constructor({rounded=false}: {rounded?: boolean}) {
        this.rounded = rounded;
    }
    componentName: string = "FCellINR";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                rounded: this.rounded
            }
        }
    }

}