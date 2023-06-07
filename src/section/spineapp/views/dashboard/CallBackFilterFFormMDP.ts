import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";

export default class CallBackFilterFFormMDP extends FFormMDP {
    childMDP: FFormChildMDP = new FFormChildMDP();
    parent: any;
    constructor(props:{parent: any}) {
        super({myRefName:"callBackFilterRef"});
        this.parent = props.parent;

        this.addField(new FPhoneFieldMDP({
            label:"Phone number",
            dataSelectorKey:"phoneNumber",
            parentMDP: this.childMDP,
            boundaryClass:"col-4"
        }))
        .addAction(new FBtnMDP({
            btnType: BtnType.OUTLINED,
            label:"Filter",
            onClick:this.handleFilterClick(),
        }))
    }


    getMyRef() {
        return this.parent.$refs[this.myRefName];
    }

    handleFilterClick() {
        return () => {
            this.getMyRef().submitForm(() => {
                this.parent.searchCallBackRequests();
            })
            
        }
    }
    handleCancelClick(){
        return () => {
            this.parent.clearForm();
        }
    }
}