
import * as Data from '@/../src-gen/data';
import {BenchTaskSummaryMutations} from '@/../src-gen/store/tasklist-store-support';

export class BenchTaskSummaryMutationsCode implements BenchTaskSummaryMutations   {


   public setCountSummary(state: Data.TaskList.BenchTaskSummary, countSummary: Data.TaskList.CountSummary  ): void  {
    state.countSummary = countSummary;
   }


}

