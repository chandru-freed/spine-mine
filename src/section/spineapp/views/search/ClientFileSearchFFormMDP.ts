import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import ClientFileSearchIntf from "./ClientFileSearchIntf";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import * as Data from "@/../src-gen/data";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";

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
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "clNameContains",
          label: "Client Name",
          boundaryClass: "col-4",
        })
      )
      .addField(new FPhoneFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "clMobileContains",
        label: "Mobile",
        boundaryClass: "col-4"
      }))
      .addField(
        new FEmailFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "clEmailId",
          label: "Email",
          boundaryClass: "col-4"
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "clientFileStatus",
          label: "Client File Status",
          boundaryClass: "col-4",
          options: Data.ClientFile.ClientFileStatus.list(),
          optionLabel:"name",
          clearable: true
        })
      )
      .addField(
        new FGompaUserRemoteAutoCompleteFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "assignedRM",
          label: "Assigned RM",
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FGompaUserRemoteAutoCompleteFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "assignedSalesRep",
          label: "Assigned Sales Rep",
          boundaryClass: "col-4",
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
