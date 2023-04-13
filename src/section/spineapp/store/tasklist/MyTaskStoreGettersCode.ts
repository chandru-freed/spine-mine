
import * as Data from '@/../src-gen/data';
import {MyTaskStoreGetters} from '@/../src-gen/store/tasklist-store-support';

export class MyTaskStoreInit {
    public static initState(): Data.TaskList.MyTaskStore  { return new Data.TaskList.MyTaskStore(); }
}

export class MyTaskStoreGettersCode implements MyTaskStoreGetters {


   public myActiveTaskList(state: Data.TaskList.MyTaskStore): Data.TaskList.GetActiveTaskListAllocatedGrid[] {
     return state.myActiveTaskList;
   }


   public myCompletedTaskList(state: Data.TaskList.MyTaskStore): Data.TaskList.CompletedTaskGrid[] {
    return state.myCompletedTaskList;
   }


   public mySuspendedTaskList(state: Data.TaskList.MyTaskStore): Data.TaskList.SuspendedTaskAllocated[] {
    return state.mySuspendedTaskList;
   }


   public myTaskDashboardSummary(state: Data.TaskList.MyTaskStore): Data.TaskList.MyTaskDashboardSummary {
    const summary = state.myTaskDashboardSummary;
    summary.myActiveTaskCount = state.myActiveTaskList.length;
    summary.myCompletedTaskCount = state.myCompletedTaskList.length;
    summary.mySuspendedTaskCount = state.mySuspendedTaskList.length;
    summary.myTotalTaskCount = summary.myActiveTaskCount + summary.myCompletedTaskCount + summary.mySuspendedTaskCount;
    return state.myTaskDashboardSummary;
   }

}
