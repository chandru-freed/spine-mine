
import TaskAction from "./TaskAction";
export default class Task  {
    static Action = TaskAction;
    static isTaskActionable(taskState: string) {
      // taskState === "EXCEPTION_Q" 
      // taskState === "EXCEPTION_Q" | taskState === "PARTIALLY_COMPLETED" || taskType !== "deferred"
      return (
        (taskState === "STARTED" ||
        taskState === "PARTIALLY_COMPLETED"||
        taskState === "EXCEPTION_Q") 
        //TODO : also check for allowed taskType (Manual / Self) - deferred is not allowed
      );
    }

    static isTaskNotActionable(taskState: string) {
      return !this.isTaskActionable(taskState)
    }
  
   
}