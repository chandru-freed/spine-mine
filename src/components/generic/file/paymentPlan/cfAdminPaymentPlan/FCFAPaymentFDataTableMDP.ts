import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellCurrencyBtnMDP from "@/components/generic/table/cell/FCellCurrencyBtnMDP";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";

export default class FCFAPaymentFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({
      itemKey: "psEntryId",
      disabled: parent.disabledActionBtn,
      title: "Payment List",
      myRefName: "fCFPaymentFDataTableRef",
    });
    this.parent = parent;
    this.addColumn({
      label: "Payment Type",
      dataSelectorKey: "paymentType.name",
      //   columnCellMDP: new FCellDateMDP(),
    })
      .addColumn({
        label: "Total Amount",
        dataSelectorKey: "totalAmount",
        columnCellMDP: new FCellCurrencyBtnMDP({
          color: "secondary",
          onClick: (item) => {
            this.parent.openPaymentDetails(item);
          },
        }),
      })
      .addColumn({
        label: "Account Holder Name",
        dataSelectorKey: "accountHolderName",
        // columnCellMDP: new FCellCurrencyMDP({}),
      })
      .addColumn({
        label: "Payment Provider",
        dataSelectorKey: "paymentProvider.name",
        columnCellMDP: new FCellStatusMDP({
        }),
      })
      .addColumn({
        label: "Status",
        dataSelectorKey: "status.name",
        columnCellMDP: new FCellStatusMDP({
          colorCodeData: Data.Color.PAYMENT_STATUS,
          outlined: true
        }),
      }).addColumn({
        label: "Presented Date",
        dataSelectorKey: "presentedDate",
        columnCellMDP: new FCellDateMDP(),
      })
      .addColumn({
        label: "Received By",
        dataSelectorKey: "Received By",
        columnCellMDP: new FCellStatusMDP({}),
      });
  }
}