import MDP from "@/components/generic/MDP";
export default class StepSummaryMDP implements MDP {
    componentName: string = "StepSummary";
    myRefName: string = "stepSummary";
    summaryList: SummaryMDP[] = [];

    addSummary(props: { name: string, content: MDP, stepIndex: Number }) {
        this.summaryList.push(new SummaryMDP({
            name: props.name,
            content: props.content,
            stepIndex: props.stepIndex
        }));
        return this;
    }

    getMetaData(): object {
        return {
            componentName: this.componentName,
            myRefName: this.myRefName,
            props: {
                summaryMetaDataList: this.summaryList.map((summary) => summary.getMetaData()),
            }
        }
    }
}

export class SummaryMDP implements MDP {
    name: string;
    content: MDP;
    stepIndex: Number;
    constructor(props: { name: string; content: MDP; stepIndex: Number }) {
        this.name = props.name;
        this.content = props.content;
        this.stepIndex = props.stepIndex;
    }

    getMetaData(): object {
        return {
            name: this.name,
            content: this.content.getMetaData(),
            stepIndex: this.stepIndex
        };
    }
}