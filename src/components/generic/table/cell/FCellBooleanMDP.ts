import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellBooleanMDP implements FColumnCellMDP {

    constructor(props: {

    }) {

    }
    componentName: string = "FCellBoolean";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {

            }
        }
    }

}