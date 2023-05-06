import FAmendmentCreditorV4MDP from "@/components/generic/file/amendmentCreditorV4/FAmendmentCreditorV4MDP";


export default class PATV4CreditorStepFCreditorMDP extends FAmendmentCreditorV4MDP {
    constructor(props: {parent: any, taskRoot: any}) {
        super({myRefName: "PATV4FStepperMDP",parent: props.parent, taskRoot: props.taskRoot,disabled: props.taskRoot.taskDisabled,
    dataSelectorKey:"taskOutput.payload.creditorInfo"
    });
    }

    getMyRef() {
        return this.parent.getMyRef().$refs[this.myRefName];
      }
}