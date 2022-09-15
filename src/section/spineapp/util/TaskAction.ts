import ModelVue from "@/components/generic/ModelVue";
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

import * as Snackbar from 'node-snackbar';
export default class TaskAction  {
    
    static saveAndMarkCompleteTask({taskId, taskOutput}:{taskId: string, taskOutput: any}) {
      const input = JSON.stringify(taskOutput);
      console.log("Save and complete take is being called");
      Action.TaskList.SaveAndComplete.execute2(
        taskId,
        input,
        (output) => {}
      );
    }
  
    static saveTask({taskId, taskOutput}:{taskId: string, taskOutput: any}) {
      const input = JSON.stringify(taskOutput);
      console.log("Save take is being called");
      Action.TaskList.Save.execute2(
        taskId,
        input,
        (output) => {
          Snackbar.show({
            text: "Succesfully saved",
            pos:"bottom-center"
          })
          // console.log(output);
        }
      );
    }

    static rescueTask({taskId, taskOutput}:{taskId: string, taskOutput: any}) {
      console.log("Rescue task call");
      //TODO: add rescue task to TaskList ads and implement
    }

    static forceCompleteTask({taskId, taskOutput}:{taskId: string, taskOutput: any}) {
      console.log("Force complete task call");
      //TODO: add force complete task to TaskList ads and implement
    }
  
    static proceedTask({taskId, taskOutput}:{taskId: string, taskOutput: any}) {
      console.log("Proceed task call");
      //TODO: add proceed task to TaskList ads and implement
    }
  
}