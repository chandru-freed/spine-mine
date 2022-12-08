import FAmendmentCreditorMDP from "@/components/generic/file/amendmentCreditor/FAmendmentCreditorMDP";

export default class PATCreditorStepFCreditorMDP extends FAmendmentCreditorMDP {
    constructor(props: {parent: any, taskRoot: any}) {
        super({myRefName: "PATFStepperMDP",parent: props.parent, taskRoot: props.taskRoot,disabled: props.taskRoot.taskDisabled,
    dataSelectorKey:"taskOutput.newCreditorInfo"
    });
    }

    getMyRef() {
        return this.parent.getMyRef().$refs[this.myRefName];
      }
}