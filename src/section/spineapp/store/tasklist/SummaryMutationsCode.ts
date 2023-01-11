
import * as Data from '@/../src-gen/data';
import { SummaryMutations } from '@/../src-gen/store/tasklist-store-support';

export class SummaryMutationsCode implements SummaryMutations {


   public setExecutiveTaskDetails(state: Data.TaskList.Summary, taskDetails: Data.TaskList.ExecutiveTaskDetails): void {
      state.taskDetails = taskDetails;

      state.taskDetails.outputJson = (!!taskDetails && !!taskDetails.taskOutput)
         ? JSON.parse(taskDetails.taskOutput)
         : {};

      state.taskDetails.inputJson = (!!taskDetails && !!taskDetails.taskInput)
         ? JSON.parse(taskDetails.taskInput)
         : {};
       
      state.taskDetails.isOutputEmpty = this.isOutputEmpty(taskDetails.outputJson)
      state.taskDetails.isActionable = this.isActionable(taskDetails.taskState);
   }

   
   isOutputEmpty(taskOutput: any = {}) {
      return Object.keys(taskOutput).length === 0;
    }

    isActionable(taskState: string) {
      return (
        (taskState === "STARTED" ||
        taskState === "PARTIALLY_COMPLETED"||
        taskState === "EXCEPTION_Q" ||
        taskState === "EXIT_Q") 
        //TODO : also check for allowed taskType (Manual / Self) - deferred is not allowed
      );
    }


}

