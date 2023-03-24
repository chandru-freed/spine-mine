import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FAccountFieldMDP from "@/components/generic/form/field/FAccountFieldMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import FEMandateSelectFieldMDP from "@/components/generic/form/field/FEMandateSelectFieldMDP";
import FRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FRemoteAutoCompleteFieldMDP";
import FCityAutoCompleteFieldMDP from "@/components/generic/form/field/FCityAutoCompleteFieldMDP";
import FStateSelectFieldMDP from "@/components/generic/form/field/FStateSelectFieldMDP";

export default class CreateAgentFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({
      myRefName: "createAgentFFormref",
      disabled: parent.taskDisabled,
    });
    this.parent = parent;

    this.addField(
        new FRemoteAutoCompleteFieldMDP({
            parentMDP: this.childMDP,
            dataSelectorKey: "creditorName",
            label: "Creditor",
            mandatory: true,
            boundaryClass: "col-3",
            queryUrl: "/spineapi/collectioncreditor/search-credito-list-for-collection?creditorName=",
            itemText: "creditorName",
            itemValue: "creditorId",
          })
    ).addField(new FCityAutoCompleteFieldMDP({
      dataSelectorKey: "city",
      label: "City",
      parentMDP: new FFormChildMDP(),
      queryUrl: "/spineapi/master/find-city-and-state?cityName=",
      itemText: "cityName",
      itemValue: "cityName",
      boundaryClass:"col-3",
      mandatory: true
  })).addField(
    new FStateSelectFieldMDP({
      parentMDP: this.childMDP,
      dataSelectorKey: "state",
      label: "State",
      mandatory: true,
      boundaryClass: "col-3",
    })
    
  ).addField(
    new FTextFieldMDP({
      parentMDP: this.childMDP,
      dataSelectorKey: "state",
      label: "Creditor Code",
      mandatory: true,
      boundaryClass: "col-3",
    }));
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.parent.draftPayment());
    };
  }

  getMyRef(): any {
    return this.parent.$refs[this.myRefName];
  }
}
