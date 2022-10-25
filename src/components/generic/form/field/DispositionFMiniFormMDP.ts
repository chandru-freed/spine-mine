import FAutoCompleteFieldMDP from "./FAutoCompleteFieldMDP";
import FMiniFormMDP, { FFormChildMDP } from "./FMiniFormMDP"
import FTextareaMDP from "./FTextareaMDP";

export default class DispositionFMiniFormMDP extends FMiniFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    parent: any;
    dispositionTypeList: DispositionType[];
    constructor({
        taskRoot, parent, dataSelectorKey, condition, dispositionTypeList,boundaryClass
    }: {
        taskRoot: any;
        parent: any,
        dataSelectorKey: string,
        condition: boolean,
        dispositionTypeList:DispositionType[],
        boundaryClass?: string
    }) {
        super({
            parentMDP: new FFormChildMDP(),
            dataSelectorKey: dataSelectorKey,
            label: "Disposition",
            condition,
            boundaryClass: boundaryClass
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this.addField(new FAutoCompleteFieldMDP({
            parentMDP: this.childMDP,
            dataSelectorKey: "dispositionType",
            label: "Disposition Type",
            options: dispositionTypeList,
            itemText: "label",
            itemValue: "value",
        })).addField(new FTextareaMDP({
            parentMDP: this.childMDP,
            dataSelectorKey: "dispositionDescription",
            label: "Disposition Descritpion",
            
        }))
    }
}

export class DispositionType {
    label: string;
    value: string;
    constructor({
        label,
        value
    }: {
        label: string,
        value: string
    }) {
        this.label = label;
        this.value = value;
    }
}
