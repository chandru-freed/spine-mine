import ModelVue from "@/components/generic/ModelVue";
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

import * as Snackbar from "node-snackbar";
export default class TaskAction {
  static saveAndMarkCompleteTask({
    taskId,
    taskOutput,
  }: {
    taskId: string;
    taskOutput: any;
  }) {
    const input = JSON.stringify(taskOutput);
    Action.TaskList.SaveAndComplete.execute2(taskId, input, (output) => {
      Snackbar.show({
        text: "Succesfully completed the task",
        pos: "bottom-center",
      });
    });
  }

  static saveTask({
    taskId,
    taskOutput,
    callback,
  }: {
    taskId: string;
    taskOutput: any;
    callback?: () => void;
  }) {
    const input = JSON.stringify(taskOutput);
    Action.TaskList.Save.execute2(taskId, input, (output) => {
      Snackbar.show({
        text: "Succesfully saved",
        pos: "bottom-center",
      });
      if (callback) {
        callback();
      }
    });
  }

  static rescueTask({
    taskId,
    taskOutput,
    callback,
  }: {
    taskId: string;
    taskOutput: any;
    callback?: (taskOutput: any) => void;
  }) {
    const rescueInput = JSON.stringify(taskOutput ?? {});
    Action.TaskList.Rescue.execute2(taskId, rescueInput, (output) => {
      Snackbar.show({
        text: "Succesfully Rescue",
        pos: "bottom-center",
      });
      if (callback) {
        callback(taskOutput);
      }
    });
  }

  static forceCompleteTask({
    taskId,
    taskOutput,
  }: {
    taskId: string;
    taskOutput: any;
  }) {
    //TODO: add force complete task to TaskList ads and implement
  }

  static proceedTask({
    taskId,
    taskOutput,
  }: {
    taskId: string;
    taskOutput: any;
  }) {
    //TODO: add proceed task to TaskList ads and implement
  }

  static retryTask({taskId}:{
    taskId: string
  }) {
    Action.TaskList.Retry.execute1(taskId,output => {
    });
  }
}
