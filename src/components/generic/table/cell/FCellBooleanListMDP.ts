import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellBooleanListMDP implements FColumnCellMDP {

    constructor(props: {

    }) {

    }
    componentName: string = "FCellBooleanList";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {

            }
        }
    }

}