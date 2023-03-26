import FBtnMDP from "../../FBtnMDP";
import FFormMDP, { FFormChildMDP } from "../../form/FFormMDP";
import FNumberFieldMDP from "../../form/field/FNumberFieldMDP";
import FTextFieldMDP from "../../form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import FSelectFieldMDP from "../../form/field/FSelectFieldMDP";
import * as Action from "@/../src-gen/action";
import FFileFieldMDP from "../../form/field/FFileFieldMDP";

export default class FUpdateCreditScoreFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    parent: any;
    constructor({ parent }: {  parent: any }) {
        super({ myRefName: "fUpdateCreditScoreFFormRef" });
        this.parent = parent;
        this.addField(new FFileFieldMDP({
            parentMDP: this.childMDP,
            dataSelectorKey: "creditReport",
            label: "Credit Report",
            boundaryClass: "col-6",
            mandatory: true
        })).addAction(new FBtnMDP({
            label: "Cancel",
            onClick: this.closeAndClearAllForms()
        })).addAction(new FBtnMDP({
            label: "Uplaod Credit Report",
            onClick: this.handleUploadCreditReport()
        }))
    }

    handleUploadCreditReport() {
        return () => {
            this.getMyRef().submitForm(() => {
               this.parent.addCreditorFromPDF();
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