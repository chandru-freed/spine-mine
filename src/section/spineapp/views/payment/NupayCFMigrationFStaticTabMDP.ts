import FStaticTabMDP, { FStaticTabContentMDP } from "@/components/generic/FStaticTabMDP";
import NupayPresentationListFDataTableMDP from "./NupayPresentationListFDataTableMDP";
import NupayTransactionListFDataTableMDP from "./NupayTransactionListFDataTableMDP";
import NupayCibListFDataTableMDP from "./NupayCibListFDataTableMDP";
import NupayMigratedCFFDataTableMDP from "./NupayMigratedCFFDataTableMDP";

export default class NupayCFMigrationFStaticTabMDP extends FStaticTabMDP {
    parent: any;
    constructor(props: { parent: any }) {
        super({ myRefName: "nupayCFMigrationFStaticTabRef" });
        this.parent = parent;
        this.addTab(new FStaticTabContentMDP({
            name: "Incoming",
            tabContent: new NupayMigratedCFFDataTableMDP({ parent: this,dataSelectorKey: "incomingPaymentList" })
        }))
        .addTab(new FStaticTabContentMDP({
            name:"Outgoing",
            tabContent: new NupayMigratedCFFDataTableMDP({ parent: this, dataSelectorKey:"outgoingPaymentList" })
        }))

    }
}