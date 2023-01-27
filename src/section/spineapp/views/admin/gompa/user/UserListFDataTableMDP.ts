import FDataTableMDP from "@/components/generic/table/FDataTableMDP";

export default class SalesRepListFDataTableMDP extends FDataTableMDP {
    constructor() {
        super({
            dataSelectorKey: '',
            myRefName: 'salesRepListFDataTableRef'
        });
    }
}