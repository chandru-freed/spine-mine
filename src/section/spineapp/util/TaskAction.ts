import ModelVue from "@/components/generic/ModelVue";
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";

export default class TaskAction  {
    
    static saveAndMarkCompleteTask({taskId, taskOutput}:{taskId: string, taskOutput: any}) {
      const input = JSON.stringify(taskOutput);
      console.log("Save and complete take is being called");
      Action.TaskList.SaveAndComplete.execute2(
        taskId,
        input,
        (output) => {},
        (err) => {
          console.error(err);
        },
        RemoteApiPoint.BenchApi
      );
    }
  
    static saveTask({taskId, taskOutput}:{taskId: string, taskOutput: any}) {
      const input = JSON.stringify(taskOutput);
      console.log("Save take is being called");
      Action.TaskList.Save.execute2(
        taskId,
        input,
        (output) => {
          // console.log(output);
        },
        (err) => {
          console.error(err);
        },
        RemoteApiPoint.BenchApi
      );
    }
  
   
}