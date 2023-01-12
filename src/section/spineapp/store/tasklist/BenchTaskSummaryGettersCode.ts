
import * as Data from '@/../src-gen/data';
import { BenchTaskSummaryGetters } from '@/../src-gen/store/tasklist-store-support';

export class BenchTaskSummaryInit {
  public static initState(): Data.TaskList.BenchTaskSummary { return new Data.TaskList.BenchTaskSummary(); }
}

export class BenchTaskSummaryGettersCode implements BenchTaskSummaryGetters {


  public countSummary(state: Data.TaskList.BenchTaskSummary): Data.TaskList.CountSummary {
    return state.countSummary;
  }
  public cfTaskList(state: Data.TaskList.BenchTaskSummary): Data.TaskList.GetTaskListByCidGrid[] {
    return state.cfTaskList;
  }
  
  public cfActiveTaskList(state: Data.TaskList.BenchTaskSummary): Data.TaskList.GetTaskListByCidGrid[] {
    return state.cfTaskList.filter(task => {
      return (
        task.taskState === "CREATED" ||
        task.taskState === "TO_BE_ALLOCATED" ||
        task.taskState === "TO_BE_PULLED" ||
        task.taskState === "RESOURCE_UNAVAILABLE" ||
        task.taskState === "ALLOCATED" ||
        task.taskState === "STARTED" ||
        task.taskState === "PARTIALLY_COMPLETED" ||
        task.taskState === "EXCEPTION_Q" ||
        task.taskState === "EXIT_Q" ||
        task.taskState === "PENDING_SCHEDULED"||
        task.taskState === "PENDING_CANCELLED"
      );
    })
  }

}
