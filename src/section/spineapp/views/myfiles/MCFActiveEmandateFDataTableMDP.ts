import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellBooleanMDP from "@/components/generic/table/cell/FCellBooleanMDP";
import FCellCopyMDP from "@/components/generic/table/cell/FCellCopyMDP";
import FCellRouterLinkMDP from "@/components/generic/table/cell/FCellRouterLinkMDP";

export default class MCFActiveEmandateFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "activeEmandateFDataTableRef",
      enableSearch: true,
      title: "Active Emandate",
    });
    this.parent = props.parent;
    this.addClientFileNumberColumn({
      label: "Client File Number",
      dataSelectorKey: "clientFileNumber",
    })
      .addClientFileStatusColumn({ dataSelectorKey: "clientFileStatus.name" })
      .addClientNameColumn({
        label: "Client Name",
        dataSelectorKey: "fullName",
      })
      .addColumn({
        label: "Mobile",
        dataSelectorKey: "mobile",
        columnCellMDP: new FCellPhoneMDP(),
      })
      .addColumn({
        label: "E-mail",
        dataSelectorKey: "emailId",
        columnCellMDP: new FCellEmailMDP(),
      })
      .addColumn({
        label: "Created On",
        dataSelectorKey: "dateCreated",
        columnCellMDP: new FCellDateTimeMDP(),
      })
      .addColumn({
        label: "City",
        dataSelectorKey: "city",
      })
      .addColumn({
        label: "Emandate Active",
        dataSelectorKey: "eMandateActive",
        columnCellMDP: new FCellBooleanMDP({}),
      }).addColumn({
        label: "FMSF Paid",
        dataSelectorKey: "firstMSFPaid",
        columnCellMDP: new FCellBooleanMDP({})
      });
  }
}
