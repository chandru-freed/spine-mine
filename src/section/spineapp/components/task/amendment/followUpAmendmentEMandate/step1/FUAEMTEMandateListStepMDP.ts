import FEMandateListMDP from "@/components/generic/file/eMandateList/FEMandateListMDP";

export default class FUAEMTEMandateListStepMDP extends FEMandateListMDP {
    
    constructor(props:{parent: any, taskRoot: any}) {
        super({taskRoot: props.taskRoot, parent: props.parent});
    }
}