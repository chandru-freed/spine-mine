import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellCurrencyMDP implements FColumnCellMDP {
    rounded: boolean | undefined;
    constructor({rounded=false}: {rounded?: boolean}) {
        this.rounded = rounded;
    }
    componentName: string = "FCellCurrency";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                rounded: this.rounded
            }
        }
    }

}