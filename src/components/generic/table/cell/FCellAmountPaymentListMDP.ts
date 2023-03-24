import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellAmountPaymentListMDP implements FColumnCellMDP {
    itemDataSelectorKey: string;
    paymentDataSelectorKey: string;
    constructor(props: {
        itemDataSelectorKey: string,
        paymentDataSelectorKey: string
    }) {
        this.itemDataSelectorKey = props.itemDataSelectorKey;
        this.paymentDataSelectorKey = props.paymentDataSelectorKey;
    }
    componentName: string = "FCellAmountPaymentList";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                itemDataSelectorKey:this.itemDataSelectorKey,
                paymentDataSelectorKey: this.paymentDataSelectorKey
            }
        }
    }

}