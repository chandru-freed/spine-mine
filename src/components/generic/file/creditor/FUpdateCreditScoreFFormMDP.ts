import FBtnMDP from "../../FBtnMDP";
import FFormMDP, { FFormChildMDP } from "../../form/FFormMDP";
import FNumberFieldMDP from "../../form/field/FNumberFieldMDP";
import FTextFieldMDP from "../../form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import FSelectFieldMDP from "../../form/field/FSelectFieldMDP";
import * as Action from "@/../src-gen/action";

export default class FUpdateCreditScoreFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({ myRefName: "fUpdateCreditScoreFFormRef" });
        this.parent = parent;
        this.taskRoot = taskRoot;
        this.addField(new FNumberFieldMDP({
            parentMDP: this.childMDP,
            dataSelectorKey: "creditScore",
            label: "Credit Score",
            boundaryClass: "col-6",
            mandatory: true
        })).addField(new FSelectFieldMDP({
            parentMDP: this.childMDP,
            dataSelectorKey: "creditBureau",
            label: "Credit Bureau",
            options: Data.ClientFile.CreditBureau.list(),
            optionLabel: "name",
            optionValue: "id",
            boundaryClass: "col-6",
            mandatory: true
        })).addAction(new FBtnMDP({
            label: "Cancel",
            onClick: this.closeAndClearAllForms()
        })).addAction(new FBtnMDP({
            label: "Update Credit Score",
            onClick: this.handleUpdateCreditScore()
        }))
    }

    handleUpdateCreditScore() {
        return () => {
            this.getMyRef().submitForm(() => {
                console.log(this.parent.updateCreditScoreForm,"updateCreditScoreForm")
                this.parent.updateCreditScoreForm.clientFileId = (
                    this.taskRoot as any
                  ).clientFileBasicInfo.clientFileId;
                Action.ClientFile.UpdateCreditInfo.execute(this.parent.updateCreditScoreForm, output => {
                    this.parent.closeAndClearAllForms();
                });
            });
        }
    }


    getMyRef() {
        return this.parent.$refs[this.myRefName];
    }


    closeAndClearAllForms() {
        return () => {
            this.parent.closeAndClearAllForms();
        }
    }
}