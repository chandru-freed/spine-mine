
import * as Data from '@/../src-gen/data';
import {SummaryGetters} from '@/../src-gen/store/tasklist-store-support';

export class SummaryInit {
    public static initState(): Data.TaskList.Summary  { return new Data.TaskList.Summary(); }
}

export class SummaryGettersCode implements SummaryGetters {


   public executiveTaskDetails(state: Data.TaskList.Summary): Data.TaskList.ExecutiveTaskDetails {
    return state.taskDetails;
   }


   public isTaskOutputSchemaEmpty(state: Data.TaskList.Summary): boolean {
    return (state.taskDetails && state.taskDetails.taskOutputSchema && JSON.parse(state.taskDetails.taskOutputSchema).properties && Object.getOwnPropertyNames(JSON.parse(state.taskDetails.taskOutputSchema).properties).length > 0) ? false : true;
   }


   public isTaskInputSchemaEmpty(state: Data.TaskList.Summary): boolean {
    return (state.taskDetails && state.taskDetails.taskInputSchema && JSON.parse(state.taskDetails.taskInputSchema).properties && Object.getOwnPropertyNames(JSON.parse(state.taskDetails.taskInputSchema).properties).length > 0) ? false : true;
   }

}
