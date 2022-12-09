
import TaskAction from "./TaskAction";
export default class Task  {
    static Action = TaskAction;
    static isTaskActionable(taskState: string) {
      // taskState === "EXCEPTION_Q" 
      // taskState === "EXCEPTION_Q" | taskState === "PARTIALLY_COMPLETED" || taskType !== "deferred"
      return (
        (taskState === "STARTED" ||
        taskState === "PARTIALLY_COMPLETED"||
        taskState === "EXCEPTION_Q" ||
        taskState === "EXIT_Q") 
        //TODO : also check for allowed taskType (Manual / Self) - deferred is not allowed
      );
    }

    static isTaskNotActionable(taskState: string) {
      return !this.isTaskActionable(taskState)
    }

    static isTaskOutputNotAvailable(taskOutput: any = {}) {
      console.log(taskOutput)
      return Object.keys(taskOutput).length === 0;
    }

    static isTaskOutputAvailable(taskOutput: any = {}) {
      return !this.isTaskOutputNotAvailable(taskOutput)
    }

    static mergeTaskOutputAndReturn(taskInput: any = {},taskOutput: any = {},) {
      console.log(taskOutput,"taskFormOutput in task")
      if(this.isTaskOutputNotAvailable(taskOutput)) {
        return {
          ...taskInput
        }
      } else {
        return taskOutput
      }
    }
   
}