import FEMandateListMDP from "@/components/generic/file/eMandateList/FEMandateListMDP";

export default class FUAEMTEMandateListV4StepMDP extends FEMandateListMDP {
    
    constructor(props:{parent: any, taskRoot: any}) {
        super({taskRoot: props.taskRoot, parent: props.parent});
    }
}