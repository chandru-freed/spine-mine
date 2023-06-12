import MDP from "@/components/generic/MDP";
import { FFormChildMDP } from "../FFormMDP";

export default class FAutoCompleteFieldMDP implements MDP {
    componentName: string = "FAutoCompleteField";
    dataSelectorKey: string;
    options: any[];
    label: string;
    rules: string;
    mandatory: boolean;
    parentMDP: FFormChildMDP;
    boundaryClass: string | undefined
    disabled: boolean;
    itemText?: string;
    itemValue?: string;
    condition: boolean;
    constructor({
        parentMDP,
        label,
        dataSelectorKey,
        boundaryClass = "col-12",
        options,
        itemText,
        itemValue,
        mandatory = false,
        disabled = false,
        rules="",
        condition=true

    }: {
        parentMDP: FFormChildMDP;
        label: string;
        dataSelectorKey: string;
        boundaryClass?: string;
        options: any[];
        itemText?: string;
        itemValue?: string
        mandatory?: boolean;
        disabled?: boolean;
        rules?:string
        condition?:boolean
    }) {
        this.parentMDP = parentMDP;
        this.label = label;
        this.dataSelectorKey = dataSelectorKey;
        this.mandatory = mandatory;
        this.disabled = disabled;
        this.boundaryClass = boundaryClass;
        this.options = options;
        this.itemText = itemText;
        this.itemValue = itemValue;
        this.rules = rules;
        this.condition = condition;
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
                options: this.options,
            }
        }
    }

}