import MDP from '@/components/generic/MDP';
export default class CMSFTCDraftPaymentStepMDP implements MDP {
    componentName: string = "CMSFTCDraftPaymentStep";
    taskRoot: any;
    parent: any;
    dataSelectorKey: string = "taskOutput";
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        this.parent = parent;
        this.taskRoot  = taskRoot;
    }
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                taskRoot: this.taskRoot,
                dataSelectorKey: this.dataSelectorKey
            }
        }
    }
    
}