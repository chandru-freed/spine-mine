import FCellLinkMDP from "@/components/generic/table/cell/FCellLinkMDP";
import FCellUrlLinkMDP from "@/components/generic/table/cell/FCellUrlLinkMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";

      export default class CFQRCodeListFDataTableMDP  extends FDataTableMDP {
          parent: any;
          constructor({ parent }: { parent: any }) {
              super({title: "QRCodeList", myRefName: "CFQRCodeListRef"});
              this.parent = parent;
              this
              .addClientFileNumberColumn({
                          label:"Client File Number",
                          dataSelectorKey: "clientFileNumber"
                      }).addCurrencyColumn({
                          label:"Amount",
                          dataSelectorKey: "amount"
                      }).addColumn({
                          label:"S3 Url",
                          dataSelectorKey: "s3Url",
                          columnCellMDP: new FCellLinkMDP({
                            onClick: (item) => {
                                console.log(item.s3Url)
                                this.parent.openQrCode(item.s3Url)
                            },
                            linkText: "QrCode Url",
                            icon:"mdi-qrcode"
                          })
                      }).addDateTimeColumn({
                          label:"Created Date",
                          dataSelectorKey: "createdDate"
                      }).addStatusColumn({
                          label:"Status",
                          dataSelectorKey: "status.name"
                      }).addAction({
                        label:"Generate QRCode",
                        type: ActionType.ADD,
                        onClick: this.handleGenerateClick()
                      })
          }

          handleGenerateClick() {
            return () => {
                return new Promise(res => {
                    this.parent.showGenerateForm = true;
                });
            }
          }
      }
      