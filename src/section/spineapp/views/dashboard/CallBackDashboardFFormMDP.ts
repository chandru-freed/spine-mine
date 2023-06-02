import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";

export default class CallBackDashboardFFormMDP extends FFormMDP {
    childMDP: FFormChildMDP = new FFormChildMDP();
    parent: any;
    constructor(props:{parent: any}) {
        super({myRefName:"callBackRequestRef"});
        this.parent = props.parent;

        this.addField(new FTextareaMDP({
            label:"asas",
            dataSelectorKey:"noteMessage",
            parentMDP: this.childMDP,
            rows:"6"
        }))
        .addAction(new FBtnMDP({
            btnType: BtnType.TEXT,
            label:"Cancel",
            onClick:this.handleCancelClick(),
        }))
        .addAction(new FBtnMDP({
            btnType: BtnType.OUTLINED,
            label:"Add note",
            onClick:this.addNoteAndAssign(),
        }))
    }
    addNoteAndAssign() {
        return () => {
            this.parent.addNoteAndAssign();
        }
    }
    handleCancelClick(){
        return () => {
            this.parent.clearForm();
        }
    }
}