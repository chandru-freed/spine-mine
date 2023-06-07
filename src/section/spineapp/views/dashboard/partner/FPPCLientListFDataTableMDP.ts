import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";

import FCellCopyMDP from "@/components/generic/table/cell/FCellCopyMDP";
import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import DocumentsListFDataTableMDP from "./DocumentsListFDataTableMDP";
import FCellTaskStatusMDP from "@/components/generic/table/cell/FCellTaskStatusMDP";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";

export default class FPPCLientListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "fppClientListRef",
      enableSearch: true,
      title: "FPP Cleint List",
      enableShowHideColumns: true,
      itemKey: "partnerId",
    });
    this.parent = props.parent;
    this.addColumn({
      label: "Created On",
      dataSelectorKey: "createdOn",
      columnCellMDP: new FCellDateTimeMDP(),
    })
      .addClientFileNumberColumn({ dataSelectorKey: "clientFileNumber" })
      .addColumn({
        label: "Client Name",
        dataSelectorKey: "clientFullName",
        columnCellMDP: new FCellBtnMDP({
          onClick: (item) => {},
          color: "purple",
        }),
      })
      .addColumn({
        label: "PHONE",
        dataSelectorKey: "mobile",
        columnCellMDP: new FCellPhoneMDP(),
      })
      .addStatusColumn({
        label: "Referred By Partner",
        dataSelectorKey: "",
      })
      .addStatusColumn({
        label: "Status",
        dataSelectorKey: "status.name",
      })
      .addColumn({
        label: "Assigned Sales Rep",
        dataSelectorKey: "assignedSalesRep",
      });
  }
}
