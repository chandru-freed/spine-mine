
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";

import FCellCopyMDP from "@/components/generic/table/cell/FCellCopyMDP";
import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";

export default class ActivePartnerListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "activePartnerListFDataTableRef",
      enableSearch: true,
      title: "Active Partners",
      
    });
    this.parent = props.parent;
    this
      .addColumn({
        label: "Full Name",
        dataSelectorKey: "fullname",
        columnCellMDP: new FCellBtnMDP({
            onClick: () => {},
            color:"purple"
        })
      })
      .addColumn({
        label: "Unique Referral Code",
        dataSelectorKey: "uniqueReferralCode",
        columnCellMDP: new FCellCopyMDP({})
      })
      .addColumn({
        label: "Mobile",
        dataSelectorKey: "mobile",
        columnCellMDP: new FCellPhoneMDP()
      })
      .addColumn({
        label: "EmailId",
        dataSelectorKey: "emailId",
        columnCellMDP: new FCellEmailMDP()
      })
      .addColumn({
        label: "Status",
        dataSelectorKey: "status.name",
        columnCellMDP: new FCellStatusMDP({outlined: true})
      })
      .addCurrencyColumn({
        label: "Total Earnings",
        dataSelectorKey: "totalEarnings",
        
      }).addCurrencyColumn({
        label: "Current Earnings",
        dataSelectorKey: "currentEarnings",
        
      })
      
      .addNumberColumn({
        label: "Onboarded Files Count",
        dataSelectorKey: "onboardedFilesCount",
      })
  }

}
