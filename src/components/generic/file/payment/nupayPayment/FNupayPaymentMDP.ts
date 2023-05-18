import MDP from "@/components/generic/MDP";

export default class FNupayPaymentMDP implements MDP {
    parent: any;
    constructor(props: {parent: any}) {
        this.parent = props.parent;
    }
    componentName: string = "FNupayPayment";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {}
        }
    }
}