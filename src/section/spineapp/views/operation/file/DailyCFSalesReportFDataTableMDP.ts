import FDataTableMDP from "@/components/generic/table/FDataTableMDP";

export default class DailyCFSalesReportFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ title: "Daily Sales", myRefName: "DailyCFSalesReportRef" });
        this.parent = parent;
        this
            .addClientFileNumberColumn({
                label: "Client Fle Number",
                dataSelectorKey: "clientFleNumber"
            }).addDateColumn({
                label: "Sold On",
                dataSelectorKey: "soldOn",
                hidden: true
            }).addCurrencyColumn({
                label: "Msf Amount",
                dataSelectorKey: "msfAmount"
            }).addCurrencyColumn({
                label: "Spa Amount",
                dataSelectorKey: "spaAmount"
            }).addCurrencyColumn({
                label: "Tmo Amount",
                dataSelectorKey: "tmoAmount"
            }).addCurrencyColumn({
                label: "Outstanding",
                dataSelectorKey: "outstanding"
            }).addColumn({
                label: "Sales Rep",
                dataSelectorKey: "salesRep", enableGroupBy: true
            }).addBooleanColumn({
                label: "First MSF Paid",
                dataSelectorKey: "isFirstMSFPaid"
            }).addDateColumn({
                label: "MSF",
                dataSelectorKey: "firstMSFPaidOn",
                hidden: true
            }).addBooleanColumn({
                label: "EMandate",
                dataSelectorKey: "isEMandateActive"
            }).addDateColumn({
                label: "EMandate Activated On",
                dataSelectorKey: "eMandateActivatedOn",
                hidden: true
            }).addBooleanColumn({
                label: "CCDone",
                dataSelectorKey: "isCCDone"
            })
            .addInfo({
                label: "Total Sales",
                value: this.parent.clientFileSaleList.length
            })
    }
}
