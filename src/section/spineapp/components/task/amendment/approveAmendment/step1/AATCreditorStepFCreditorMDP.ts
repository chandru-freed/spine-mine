import FAmendmentCreditorMDP from "@/components/generic/file/amendmentCreditor/FAmendmentCreditorMDP";

export default class AATCreditorStepFCreditorMDP extends FAmendmentCreditorMDP {
    constructor(props: {parent: any, taskRoot: any}) {
        super({myRefName: "PATFStepperMDP",parent: props.parent, taskRoot: props.taskRoot,disabled: true,
        readonly: true,
    dataSelectorKey:"taskOutput.creditorInfo"
    });
    }

    getMyRef() {
        return this.parent.getMyRef().$refs[this.myRefName];
      }
}