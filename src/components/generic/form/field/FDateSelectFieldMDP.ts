import MDP from "../../MDP";
import { FFormChildMDP } from "../FFormMDP";

export default class FSelectDateFieldMDP implements MDP {
    componentName: string = "FDateSelectField";
    label: string;
    dataSelectorKey: string;
    rules: string;
    mandatory: boolean;
    parentMDP: FFormChildMDP;
    boundaryClass: string;
    disabled: boolean;
    pastDaysDisabled: boolean;
    futureDaysDisabled: boolean;
    constructor({
        parentMDP,
        dataSelectorKey,
        label,
        rules = "",
        mandatory = false,
        boundaryClass = "col-12",
        disabled = false,
        pastDaysDisabled = false,
        futureDaysDisabled = false
    }: {
        parentMDP: FFormChildMDP;
        dataSelectorKey: string;
        label: string;
        type?: string;
        rules?: string;
        mandatory?: boolean;
        boundaryClass?: string;
        disabled?: boolean;
        pastDaysDisabled?: boolean
        futureDaysDisabled?:boolean
    }) {
        this.parentMDP = parentMDP;
        this.dataSelectorKey = dataSelectorKey;
        this.label = label;
        this.rules = rules;
        this.mandatory = mandatory;
        this.boundaryClass = boundaryClass;
        this.disabled = disabled;
        this.pastDaysDisabled = pastDaysDisabled;
        this.futureDaysDisabled = futureDaysDisabled;
    }


    getRules() {
        const required = this.mandatory ? "required" : "";
        return `${required}|${this.rules}`;
    }

    getBoundaryClass() {
        return `${this.boundaryClass} py-0 px-2`;
    }
    
    getMetaData() {
        return {
            componentName: this.componentName,
            dataSelectorKey: this.dataSelectorKey,
            rules: this.getRules(),
            boundaryClass: this.getBoundaryClass(),
            props: {
                id: this.dataSelectorKey,
                label: this.label,
                outlined: this.parentMDP.outlined,
                dense: this.parentMDP.dense,
                disabled: this.disabled,
                pastDaysDisabled: this.pastDaysDisabled,
                futureDaysDisabled: this.futureDaysDisabled
            }
        }
    }
}