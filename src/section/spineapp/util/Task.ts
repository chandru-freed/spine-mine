import TaskAction from "./TaskAction";
import * as ApiAction from "@/../src-gen/action";
export default class Task {
  static Action = TaskAction;
  static isTaskActionable(taskState: string) {
    // taskState === "EXCEPTION_Q"
    // taskState === "EXCEPTION_Q" | taskState === "PARTIALLY_COMPLETED" || taskType !== "deferred"
    return (
      taskState === "STARTED" ||
      taskState === "PARTIALLY_COMPLETED" ||
      taskState === "EXCEPTION_Q" ||
      taskState === "EXIT_Q"
      //TODO : also check for allowed taskType (Manual / Self) - deferred is not allowed
    );
  }

  static isTaskNotActionable(taskState: string, isSuspended: boolean) {
    if (isSuspended) {
      return isSuspended;
    }
    return !this.isTaskActionable(taskState);
  }

  static isTaskOutputNotAvailable(taskOutput: any = {}) {
    return Object.keys(taskOutput).length === 0;
  }

  static isTaskOutputAvailable(taskOutput: any = {}) {
    return !this.isTaskOutputNotAvailable(taskOutput);
  }

  static mergeTaskOutputAndReturn(taskInput: any = {}, taskOutput: any = {}) {
    if (this.isTaskOutputNotAvailable(taskOutput)) {
      return {
        ...taskInput,
      };
    } else {
      return taskOutput;
    }
  }

  static isMarkCompleteEnabled(taskDetails: any) {
    if (taskDetails.isSuspended) {
      return false;
    }

    return (
      taskDetails.taskState === "STARTED" ||
      taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
  }

  // getExecutiveTaskDetails(taskId: string) {
  //   ApiAction.TaskList.GetExecutiveTaskDetails.execute1(
  //     taskId,
  //     (output) => {
  //       this.loading = false;
  //     }
  //   );
  // }
}
