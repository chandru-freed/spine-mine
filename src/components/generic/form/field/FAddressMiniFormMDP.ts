import FBtnMDP from "./../../FBtnMDP";
import FFieldMDP from "./FFieldMDP";
import MDP from "./../../MDP";
import FTextareaMDP from "./FTextareaMDP";
import FCityAutoCompleteFieldMDP from "./FCityAutoCompleteFieldMDP";
import FStateSelectFieldMDP from "./FStateSelectFieldMDP";
import FTextFieldMDP from "./FTextFieldMDP";
import FNumberTextFieldMDP from "./FNumberTextFieldMDP";

export class FFormChildMDP {
    outlined = true;
    dense = true;
}

export default class FAddressMiniFormMDP implements FFieldMDP {
    componentName = "FAddressMiniForm";

    fieldList: FFieldMDP[] = [];

    dataSelectorKey: string;
    disabled: boolean;

    label: string;
    rules: string;
    mandatory: boolean;
    boundaryClass: string;
    parentMDP: FFormChildMDP;
    childMDP: FFormChildMDP = new FFormChildMDP()
    condition: boolean;

    constructor({
        parentMDP,
        dataSelectorKey = "",
        disabled = false,
        label,
        rules = "",
        mandatory = false,
        boundaryClass = "col-12",
        condition = true
    }: {
        parentMDP: FFormChildMDP;
        dataSelectorKey?: string;
        disabled?: boolean;
        label: string;
        rules?: string;
        mandatory?: boolean;
        boundaryClass?: string;
        condition?: boolean
    }) {
        this.parentMDP = parentMDP; // todo : Check not being used
        this.dataSelectorKey = dataSelectorKey;
        this.disabled = disabled;
        this.label = label;
        this.rules = rules;
        this.mandatory = mandatory;
        this.boundaryClass = boundaryClass;
        this.condition = condition;

        this.addField(
            new FTextareaMDP({
                parentMDP: this.parentMDP,
                dataSelectorKey: "addressLine1",
                label: "Address Line 1",
                mandatory: true,
            })
        )
            .addField(new FCityAutoCompleteFieldMDP({
                dataSelectorKey: "city",
                label: "City",
                parentMDP: new FFormChildMDP(),
                queryUrl: "/spineapi/master/find-city-and-state?cityName=",
                itemText: "cityName",
                itemValue: "cityName",
                boundaryClass: "col-3",
                mandatory: true
            }))
            .addField(
                new FStateSelectFieldMDP({
                    parentMDP: this.parentMDP,
                    dataSelectorKey: "state",
                    label: "State",
                    mandatory: true,
                    boundaryClass: "col-3",
                })
            )
            .addField(
                new FTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "country",
                    label: "Country",
                    mandatory: true,
                    boundaryClass: "col-3",
                    // defaultValue: "India"
                })
            )
            .addField(
                new FNumberTextFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "pinCode",
                    label: "Pin Code",
                    mandatory: true,
                    boundaryClass: "col-3",
                    rules: "digits:6",
                    mask: "######",
                    unmask: "######",
                })
            );
    }

    getRules() {
        const required = this.mandatory ? "required" : "";
        return `${required}|${this.rules}`;
    }

    getBoundaryClass() {
        return `${this.boundaryClass} py-0 px-2`;
    }

    addField(newField: FFieldMDP) {
        this.fieldList.push(newField);
        return this;
    }

    getMetaData(): object {
        return {
            componentName: this.componentName,
            dataSelectorKey: this.dataSelectorKey,
            rules: this.getRules(),
            boundaryClass: this.getBoundaryClass(),
            condition: this.condition,
            props: {
                label: this.label,
                fieldMetaDataList: this.fieldList.map((field) => field.getMetaData()),
                disabled: this.disabled,
                mandatory: this.mandatory, // Only for miniform
            },
        };
    }
}
