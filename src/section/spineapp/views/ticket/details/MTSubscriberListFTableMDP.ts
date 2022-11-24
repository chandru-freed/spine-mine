import FDataTableMDP from "@/components/generic/FDataTableMDP";

export default class MTSubscriberListFTableMDP extends FDataTableMDP {
    constructor(){
        super({dataSelectorKey:""});
        this.addColumn({
            dataSelectorKey:"",
            label:""
        })
    }
}