
import * as Data from '@/../src-gen/data';
import {SummaryMutations} from '@/../src-gen/store/tasklist-store-support';

export class SummaryMutationsCode implements SummaryMutations   {


   public setExecutiveTaskDetails(state: Data.TaskList.Summary, taskDetails: Data.TaskList.ExecutiveTaskDetails  ): void  {
    state.taskDetails = taskDetails;
   }


}

