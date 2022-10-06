import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import * as Data from "@/../src-gen/data";


export default class AddCommentFFormMDP extends FFormMDP {
    root: any;
    constructor(prop: { root: any }) {
        super({ myRefName: "addCommentFFormRef" });
        this.root = prop.root;
        this.addField(new FTextareaMDP({
            dataSelectorKey: "comment",
            label: "Comment",
            parentMDP: new FFormChildMDP(),
            mandatory: true,
        }))
        .addAction(new FBtnMDP({
            label: "Cancel",
            onClick: this.cancel(),
            btnType: BtnType.TEXT
        })).addAction(new FBtnMDP({
            label: "Add Comment",
            onClick: this.validateAndAdd()
        }))

    }
    validateAndAdd() {
        return () => {
            this.getMyRef().submitForm(this.addComment());
        }
    }

    getMyRef(): any {
        return this.root.$refs[this.myRefName];
    }

    addComment() {
        return () => {
            this.root.addComment();
        }
    }

    cancel() {
        return () => {
            this.root.goBack();
        }
    }

}