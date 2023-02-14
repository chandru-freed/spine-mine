import MDP from "@/components/generic/MDP";
export default class StepSummaryMDP implements MDP {
    componentName: string = "StepSummary";
    myRefName: string = "stepSummary";
    summaryList: SummaryMDP[] = [];
    parent: any;
    constructor({parent}:{parent: any}) {
        this.parent = parent;
    }

    addSummary(props: { name: string, content: MDP, stepIndex: Number,taskRoot?: any }) {
        this.summaryList.push(new SummaryMDP({
            name: props.name,
            content: props.content,
            stepIndex: props.stepIndex,
            taskRoot: props.taskRoot
        }));
        return this;
    }

    getMetaData(): object {
        return {
            componentName: this.componentName,
            myRefName: this.myRefName,
            props: {
                summaryMetaDataList: this.summaryList.map((summary) => summary.getMetaData()),
                parent: this.parent
            }
        }
    }
}

export class SummaryMDP implements MDP {
    name: string;
    content: MDP;
    stepIndex: Number;
    taskRoot: any | undefined;
    constructor(props: { name: string; content: MDP; stepIndex: Number,taskRoot?: any }) {
        this.name = props.name;
        this.content = props.content;
        this.stepIndex = props.stepIndex;
        this.taskRoot = props.taskRoot
    }

    getMetaData(): object {
        return {
            name: this.name,
            content: this.content.getMetaData(),
            stepIndex: this.stepIndex,
            taskRoot: this.taskRoot
        };
    }
}