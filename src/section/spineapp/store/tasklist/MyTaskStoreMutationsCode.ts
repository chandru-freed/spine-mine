
import * as Data from '@/../src-gen/data';
import { MyTaskStoreMutations } from '@/../src-gen/store/tasklist-store-support';

export class MyTaskStoreMutationsCode implements MyTaskStoreMutations {


  public updateMyActiveTaskList(state: Data.TaskList.MyTaskStore, activeTaskList: Data.TaskList.GetActiveTaskListAllocatedGrid[]): void {
    state.myActiveTaskList = activeTaskList;
  }


  public updateCompletedTaskList(state: Data.TaskList.MyTaskStore, completedTaskList: Data.TaskList.CompletedTaskGrid[]): void {
    state.myCompletedTaskList = completedTaskList;
  }


  public updateMySuspendedTaskList(state: Data.TaskList.MyTaskStore, suspendedTaskList: Data.TaskList.SuspendedTaskAllocated[]): void {
    state.mySuspendedTaskList = suspendedTaskList;
  }


}

