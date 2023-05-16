import MDP from "@/components/generic/MDP";

export default class BudgetExceptionMDP implements MDP {
    componentName: string = "BudgetException";
    taskRoot: any;
    parent: any;
    constructor({taskRoot, parent}: {taskRoot: any;parent: any}) {
        this.taskRoot = taskRoot;
        this.parent = parent;
    }
    getMetaData() {
        return {
            componentName: this.componentName,
            props: {
                taskRoot: this.taskRoot
            }
        }
    }
}