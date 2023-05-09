import FStaticTabMDP, { FStaticTabContentMDP } from "@/components/generic/FStaticTabMDP";
import NupayPresentationListFDataTableMDP from "./NupayPresentationListFDataTableMDP";
import NupayTransactionListFDataTableMDP from "./NupayTransactionListFDataTableMDP";
import NupayCibListFDataTableMDP from "./NupayCibListFDataTableMDP";

export default class NupayPaymentFStaticTabMDP extends FStaticTabMDP {
    parent: any;
    constructor(props: { parent: any }) {
        super({ myRefName: "nupayPaymentFStaticTabMDPRef" });
        this.parent = parent;
        this.addTab(new FStaticTabContentMDP({
            name: "Presentation List",
            tabContent: new NupayPresentationListFDataTableMDP({ parent: this })
        }))
        .addTab(new FStaticTabContentMDP({
            name:"Transaction List",
            tabContent:new NupayTransactionListFDataTableMDP({parent: this})
        }))
        .addTab(new FStaticTabContentMDP({
            name:"Cib List",
            tabContent:new NupayCibListFDataTableMDP({parent: this})
        }))
        

    }
}