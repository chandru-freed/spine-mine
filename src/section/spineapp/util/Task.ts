
import TaskAction from "./TaskAction";
export default class Task  {
    static Action = TaskAction;
    static isTaskActionable(taskState: string) {
      return (
        taskState === "STARTED" ||
        taskState === "PARTIALLY_COMPLETED"||
        taskState === "EXCEPTION_Q"
      );
    }

    static isTaskNotActionable(taskState: string) {
      return !this.isTaskActionable(taskState)
    }
  
   
}