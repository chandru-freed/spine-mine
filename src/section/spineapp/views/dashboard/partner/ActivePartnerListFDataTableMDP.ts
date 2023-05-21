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
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";


export default class ActivePartnerListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "activePartnerListFDataTableRef",
      enableSearch: true,
      title: "Active Partners",
      enableShowHideColumns: true,
      itemKey: "partnerId",
    });
    this.parent = props.parent;
    this.addColumn({
      label: "FPP ID",
      dataSelectorKey: "uniqueReferralCode",
      columnCellMDP: new FCellCopyMDP({dataSelectorKeyToCopy: "uniqueReferralLink"}),
    })
      .addColumn({
        label: "PARTNER NAME",
        dataSelectorKey: "fullname",
        columnCellMDP: new FCellBtnMDP({
          onClick: (item) => {
            this.handlePartnerNameClick(item);
          },
          color: "purple",
        }),
      })
      .addColumn({
        label: "EMAIL",
        dataSelectorKey: "emailId",
        columnCellMDP: new FCellEmailMDP(),
      })
      .addColumn({
        label: "PHONE",
        dataSelectorKey: "mobile",
        columnCellMDP: new FCellPhoneMDP(),
      })

      .addStatusColumn({
        label: "STATUS",
        dataSelectorKey: "status.name",
        outlined: true,
        colorCodeData: Data.Color.PARTNER_STATUS,
        filterItemList: Data.Spine.PARTNER_STATUS.list(),
      }).addColumn({
        label: "Activated On",
        dataSelectorKey: "activatedOn",
        columnCellMDP: new FCellDateTimeMDP()
    })

      .addNumberColumn({
        label: "Onboarded Files Count",
        dataSelectorKey: "onboardedFilesCount",
      })
      .addColumn({
        label: "Age Range",
        dataSelectorKey: "ageRange.name",
      })
      .addColumn({
        label: "State",
        dataSelectorKey: "state",
      })
      .addCurrencyColumn({
        label: "Total Earnings",
        dataSelectorKey: "totalEarnings",
        hidden: true,
      })
      .addCurrencyColumn({
        label: "Current Earnings",
        dataSelectorKey: "currentEarnings",
        hidden: true,
      })
      .addAction({
        label: "Upload Certificate",
        onClick: this.handleUploadCertificate(),
        type: ActionType.OTHERS,
      })
      .addAction({
        label: "Upload Government ID",
        onClick: this.handleUploadIdentifiation(),
        type: ActionType.OTHERS,
      })
      .setExpansionComponent(new DocumentsListFDataTableMDP({ dataSelectorKey: "documentList" }));
  }

  handleUploadCertificate() {
    return (item: any) => {
      return new Promise((res) => {
        this.parent.handleCertificateFormClick(item);
      });
    };
  }

  handleUploadIdentifiation() {
    return (item: any) => {
      return new Promise((res) => {
        this.parent.handleIdentifiationFormClick(item);
      });
    };
  }

  handlePartnerNameClick(item: any){
    this.parent.gotoPartnerDetails(item.partnerId);
  }
}
