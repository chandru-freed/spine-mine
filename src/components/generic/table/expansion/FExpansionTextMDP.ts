
import FTableExpansionMDP from '../FTableExpansionMDP';
export default class FExpansionTextMDP implements FTableExpansionMDP {
    componentName: string = "FExpansionText";
    dataSelectorKey?: string;
    constructor(props: {
        dataSelectorKey?: string
    }) {
        this.dataSelectorKey = props.dataSelectorKey;
    }
    getMetaData(): object {
        return {
            componentName: this.componentName,
      props: {
        dataSelectorKey: this.dataSelectorKey,
      },
        }
    }

}