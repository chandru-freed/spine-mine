import FCreditorMDP from "@/components/generic/file/creditor/FCreditorMDP";


export default class UTCreditorStepFCreditorFFormMDP extends FCreditorMDP{
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
          taskRoot: taskRoot,
          parent: parent,
          myRefName :"underwrittingCreditorRef",
          dataSelectorKey: "taskInput.creditorInfo",
          disabled: true,
        });
    }

    getMyRef(){
        return this.parent.getMyRef().$refs[this.myRefName];
    }
}