
import * as Data from '@/../src-gen/data';
import {BenchTaskSummaryGetters} from '@/../src-gen/store/tasklist-store-support';

export class BenchTaskSummaryInit {
    public static initState(): Data.TaskList.BenchTaskSummary  { return new Data.TaskList.BenchTaskSummary(); }
}

export class BenchTaskSummaryGettersCode implements BenchTaskSummaryGetters {


   public countSummary(state: Data.TaskList.BenchTaskSummary): Data.TaskList.CountSummary {
     return state.countSummary;
   }

}
