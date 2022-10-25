import MDP from "@/components/generic/MDP";
import { FFormChildMDP } from "../FFormMDP";

export default class FRemoteAutoCompleteFieldMDP implements MDP {
    componentName: string = "FRemoteAutoCompleteField";
    dataSelectorKey: string;
    label: string;
    rules: string;
    mandatory: boolean;
    parentMDP: FFormChildMDP;
    boundaryClass: string | undefined
    disabled: boolean;
    itemText: string;
    itemValue: string | undefined;
    condition: boolean;
    queryUrl: string;
    returnObject: boolean | undefined;
    clearable: boolean;
    hideNoData: boolean = true;
    hideSelected: boolean = true;
    minSearchValueLength: number;
    constructor({
        parentMDP,
        label,
        dataSelectorKey,
        boundaryClass = "col-12",
        itemText,
        itemValue,
        mandatory = false,
        disabled = false,
        rules="",
        condition=true,
        queryUrl,
        returnObject,
        clearable=true,
        minSearchValueLength=0

    }: {
        parentMDP: FFormChildMDP;
        label: string;
        queryUrl: string;
        itemText: string;
        dataSelectorKey: string;
        boundaryClass?: string;
        itemValue?: string
        mandatory?: boolean;
        disabled?: boolean;
        rules?:string;
        condition?:boolean;
        returnObject?: boolean;
        clearable?:boolean;
        minSearchValueLength?: number
    }) {
        this.parentMDP = parentMDP;
        this.label = label;
        this.dataSelectorKey = dataSelectorKey;
        this.mandatory = mandatory;
        this.disabled = disabled;
        this.boundaryClass = boundaryClass;
        this.itemText = itemText;
        this.itemValue = itemValue;
        this.rules = rules;
        this.condition = condition;
        this.queryUrl = queryUrl;
        this.returnObject = returnObject;
        this.clearable = clearable;
        this.minSearchValueLength = minSearchValueLength
    }


    getRules() {
        const required = this.mandatory ? "required" : "";
        return `${required}|${this.rules}`;
    }

    getBoundaryClass() {
        return `${this.boundaryClass} py-0 px-2`
    }

    getMetaData(): object {
        return {
            id: this.dataSelectorKey,
            componentName: this.componentName,
            rules: this.getRules(),
            boundaryClass: this.getBoundaryClass(),
            dataSelectorKey: this.dataSelectorKey,
            condition:this.condition,
            props: {
                id: this.dataSelectorKey,
                label: this.label,
                disabled: this.disabled,
                outlined: this.parentMDP.outlined,
                dense: this.parentMDP.dense,
                itemText: this.itemText,
                itemValue: this.itemValue,
                queryUrl: this.queryUrl,
                returnObject: this.returnObject,
                clearable: this.clearable,
                hideNoData: this.hideNoData,
                hideSelected: this.hideSelected,
                minSearchValueLength: this.minSearchValueLength
            }
        }
    }

}