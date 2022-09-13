import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import ClientFileSearchIntf from "./ClientFileSearchIntf";

export default class ClientFileSearchFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: ClientFileSearchIntf;
  constructor({ taskRoot }: { taskRoot: ClientFileSearchIntf }) {
    super({
      myRefName: "clientFileSearchFFormRef",
    });
    this.taskRoot = taskRoot;

    this
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "clientFileNumberContains", 
          label: "File Number",
          boundaryClass: "col-3",
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "clNameContains",
          label: "Client Name",
          boundaryClass: "col-3",
        })
      )
      .addField(new FPhoneFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "clMobileContains",
        label: "Mobile",
        boundaryClass: "col-3"
      }))
      .addField(
        new FEmailFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "clEmailId",
          label: "Email",
          boundaryClass: "col-3"
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Search",
          onClick: this.searchClientFile(),
        })
      );
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }

  searchClientFile() {
    return () => {
      this.taskRoot.searchClientFile();
    };
  }
}
