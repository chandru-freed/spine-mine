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

export default class PartnerDetailsListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "partnerDetailsListFDataTableRef",
      enableSearch: true,
      title: "Partner Cleint List",
      enableShowHideColumns: true,
      itemKey: "partnerId",
    });
    this.parent = props.parent;
    this.addClientFileNumberColumn({ dataSelectorKey: "clientFileNumber",})
      .addColumn({
        label: "Client Name",
        dataSelectorKey: "clientFullName",
        columnCellMDP: new FCellBtnMDP({
          onClick: (item) => {},
          color: "purple",
        }),
      })
      .addStatusColumn({
        label: "Status",
        dataSelectorKey: "status.name",
      });
  }
}
