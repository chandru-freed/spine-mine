import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import FCellUrlLinkMDP from "@/components/generic/table/cell/FCellUrlLinkMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";
import FCellCopyMDP from "@/components/generic/table/cell/FCellCopyMDP";
import FCellBtnPreviewMDP from "@/components/generic/table/cell/FCellBtnPreviewMDP";

export default class DCPClientCreditorListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ title: "Creditor List", myRefName: "DCPAgreementListRef",enableSearch: false, enableShowHideColumns: false, enableExport: false  });
    this.parent = parent;
    this.addColumn({
      label: "Creditor Name",
      dataSelectorKey: "creditorName",
    })
      .addCurrencyColumn({
        label: "Creditor Balance",
        dataSelectorKey: "creditorBalance",
      })
      .addCurrencyColumn({
        label: "Emi Amount",
        dataSelectorKey: "emiAmount",
      });
  }
}
