import Vue from "vue";
import { Prop } from "vue-property-decorator";

export default class ModelVue extends Vue {
  @Prop()
  value: any;

  get modelValue(): any {
    return this.value;
  }

  set modelValue(newModelValue: string) {
    // console.log("emitting input " + newModelValue);
    this.$emit("input", newModelValue);
  }


  selectModel(modelData: any, modelSelectorKey: string | undefined) {
    if(!modelSelectorKey) {
      return modelData
    } else {
      const arr = modelSelectorKey.split(".")
      let ret = modelData
      arr.forEach(elem => { 
        ret = ret[elem]
      })

      return ret
    }
    
  }

  updateModel(modelData: any, newValue: any , modelSelectorKey: string | undefined) {
    if(!modelSelectorKey) {
      modelData = newValue
    } else {
      const arr = modelSelectorKey.split(".")
      if(arr.length == 1) {
        modelData[modelSelectorKey] = newValue
      } else {
        const lastDataSelector = arr[arr.length-1]
        const childDataSelector = arr.slice(0, arr.length - 1).join(".")
        const childModelData  = this.selectModel(modelData,childDataSelector)
        childModelData[lastDataSelector] = newValue
      }
    }
  }


}
