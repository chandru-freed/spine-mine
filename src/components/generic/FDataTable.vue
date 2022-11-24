<template>
  <v-card flat outlined>
    <v-data-table
      @input="handleSelectChange"
      :headers="filteredHeaders"
      :items="items"
      class="elevation-0"
      :show-select="showCheckbox"
      :single-select="true"
      v-bind="$props"
      checkbox-color="primary"
    >
      <template v-if="title || actions.length > 0" v-slot:top>
        <v-toolbar class="mx-1" flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer />
          <div class="col-3" v-if="filteredActions.length>2">
          <v-select
          :value="selectedAction"
          :items="filteredActions"
          @input="handleActionClick"
          item-text="label"
          outlined
          return-object
          small
          dense
          :hide-details="true"
          label="Actions"
          :disabled="selectedItems.length == 0 || disabled"
          color="primary"
          />
          </div>
          <div v-else class="d-flex">
          <v-btn
            v-for="(action, index) in filteredActions"
            :key="'action' + index"
            outlined
            @click="() => handleActionClick(action)"
            small
            class="mx-2"
            color="primary"
            :disabled="selectedItems.length == 0 || disabled"
          >
            {{ action.label }}
          </v-btn>
          </div>
          
          <f-add-btn
            v-if="addBtnData"
            outlined
            :label="addBtnData.label"
            @click="addBtnData.onClick"
          />
        </v-toolbar>
      </template>

      <template
        v-for="header in headers"
        v-slot:[`item.${header.value}`]="{ item }"
      >
        <slot :name="[`item.${header.value}`]" :item="item">
          {{ getValue(item, header.value) }}
        </slot>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon v-if="editBtnData" :disabled="disabled" small @click="handleEditClick(item)">
          mdi-pencil
        </v-icon>
        <v-icon
          v-if="deleteBtnData"
          :disabled="disabled"
          small
          @click="handleDeleteClick(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VBtn, VDataTable } from "vuetify/lib/components";
import FAddBtn from "./FAddBtn.vue";
import * as Snackbar from "node-snackbar";

@Component({
  components: {
    VBtn,
    FAddBtn,
  },
})
export default class FDataTable extends VDataTable {
  @Prop({
    default: () => [],
  })
  headers: any[];

  @Prop({
    default: () => [],
  })
  items: any[];

  @Prop({
    default: () => [],
  })
  dataSelectorKey: any[];

  @Prop({
    default: () => [],
  })
  actions: any[];

  @Prop({
    default: false,
  })
  disabled: boolean;

  @Prop({
    default: null,
  })
  title: string;

  selectedItems: any = [];
  selectedAction: any = {};

  getValue(item: any, path: any) {
    console.log(path,item,"item")
    return path.split(".").reduce((res: any, prop: any) => res[prop], item);
  }

  handleSelectChange(newVal: any) {
    this.selectedAction = {};
    this.selectedItems = newVal;
  }

  handleActionClick(action: any) {
    this.selectedAction = action;
    action.onClick(this.selectedItems[0]);
  }

  handleDeleteClick(item: any) {
    // const deleteAction = this.actions.find(item => item.type===ActionType.DELETE);
    this.deleteBtnData.onClick(item);
  }

  handleEditClick(item: any) {
    const editAction = this.actions.find(item => item.type===ActionType.EDIT);
    editAction.onClick(item);
  }



  get deleteBtnData() {
    return this.actions.find(item => item.type === ActionType.DELETE)
  }

  get editBtnData() {
    return this.actions.find(item => item.type === ActionType.EDIT);
  }

  get addBtnData() {
    return this.actions.find(item => item.type === ActionType.ADD);
  }

  get filteredHeaders() {
    const headers = [...this.headers];
    if (this.deleteBtnData||this.editBtnData) {
      headers.push({ text: "", value: "actions", align:"right" });
    }

    return headers;
  }

  get filteredActions() {
    return this.actions.filter(item => item.type === ActionType.OTHERS)
  }

  get showCheckbox() {
    return this.actions.filter(item => item.type === ActionType.OTHERS).length > 0;
  }

  //  @Prop({
  //   default:() => []
  //  })
  // value: any;

  // get modelValue(): any {
  //   return this.value;
  // }

  // set modelValue(newModelValue: any) {
  //   // console.log("emitting input " + newModelValue);
  //   this.$emit("input", newModelValue);
  // }


  // selectModel(modelData: any, modelSelectorKey: string | undefined) {
  //   if(!modelSelectorKey) {
  //     return modelData
  //   } else {
  //     const arr = modelSelectorKey.split(".")
  //     let ret = modelData
  //     arr.forEach(elem => { 
  //       ret = ret[elem]
  //     })

  //     return ret
  //   }
    
  // }

  // updateModel(modelData: any, newValue: any , modelSelectorKey: string | undefined) {
  //   if(!modelSelectorKey) {
  //     modelData = newValue
  //   } else {
  //     const arr = modelSelectorKey.split(".")
  //     if(arr.length == 1) {
  //       modelData[modelSelectorKey] = newValue
  //     } else {
  //       const lastDataSelector = arr[arr.length-1]
  //       const childDataSelector = arr.slice(0, arr.length - 1).join(".")
  //       const childModelData  = this.selectModel(modelData,childDataSelector)
  //       childModelData[lastDataSelector] = newValue
  //     }
  //   }
  // }
}

export enum ActionType {
  ADD = "ADD",
  DELETE = "DELETE",
  EDIT = "EDIT",
  OTHERS = "OTHERS",
}
</script>
