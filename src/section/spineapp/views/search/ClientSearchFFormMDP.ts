import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import ClientSearchIntf from "./ClientSearchIntf";

export default class ClientSearchFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: ClientSearchIntf;

  constructor({ taskRoot }: { taskRoot: ClientSearchIntf}) {
    super({
      myRefName: "clientSearchFFormRef",
    });
    this.taskRoot = taskRoot;
    

    this
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "nameContains",
          label: "Client Name",
          boundaryClass: "col-4",
        })
      )
      .addField(new FPhoneFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "mobileContains",
        label: "Mobile",
        boundaryClass: "col-4"
      }))
      .addField(
        new FEmailFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "emailId",
          label: "Email",
          boundaryClass: "col-4"
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Search",
          onClick: this.searchClient(),
        })
      );
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }

  searchClient() {
    return () => {
      this.taskRoot.searchClient();
    };
  }
}
