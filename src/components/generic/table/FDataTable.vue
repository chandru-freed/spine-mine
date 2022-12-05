<template>
  <v-card :ref="myRefName" flat outlined>
    <v-alert
      dense
      outlined
      text
      color="warning"
      v-if="showConfirmation == true"
    >
      <div
        class="d-flex flex-row align-start flex-wrap justify-space-around pa-2"
      >
        <div class="my-1">Are you sure want to proceed?</div>
        <v-spacer />
        <v-btn
          @click="showConfirmation = false"
          outlined
          color="warning"
          class="mx-2"
          >Cancel</v-btn
        >
        <v-btn @click="handleActionClick" outlined color="warning" class="mx-2">
          Confirm
        </v-btn>
      </div>
    </v-alert>
    <v-data-table
      :value="selectedItems"
      @input="handleSelectChange"
      :headers="filteredHeaders"
      :items="selectModel(modelValue, dataSelectorKey)"
      class="elevation-0"
      :show-select="showCheckbox"
      :single-select="!multiSelect"
      v-bind="$props"
      :disabled="disabled"
      :itemKey="itemKey"
      :search="search"
      checkbox-color="primary"
    >
      <template v-if="title || actions.length > 0 || enableSearch" v-slot:top>
        <v-toolbar class="mx-1" flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <div v-for="(info, index) in infoList" :key="info.label+index">
              <component
            :is="info.infoMetaData.componentName"
            :value="info.value"
            :label="info.label"
            v-bind="info.infoMetaData.props"
          ></component>
          </div>
          <v-spacer />
          <div class="col-3" v-if="filteredActions.length > 2">
            <v-select
              :value="selectedAction"
              :items="filteredActions"
              @input="actionClicked"
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
              @click="() => actionClicked(action)"
              small
              class="mx-2"
              color="primary"
              :disabled="
                selectedItems.length == 0 || disabled || action.disabled
              "
            >
              {{ action.label }}
            </v-btn>
          </div>

          <f-add-btn
            class="mx-3"
            v-if="addBtnData"
            outlined
            :label="addBtnData.label"
            @click="addBtnData.onClick"
             :disabled="
               disabled || addBtnData.disabled
              "
          />
          <v-text-field
            v-if="enableSearch"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search Item"
            single-line
            hide-details
            outlined
            rounded
            dense
            class="shrink"
          ></v-text-field>
        </v-toolbar>
      </template>

      <template
        v-for="header in columnList"
        v-slot:[`item.${header.value}`]="{ item }"
      >
        <slot :name="[`item.${header.value}`]" :item="item">
          <component
            :ref="header.columnCellMetaData.myRefName"
            :is="header.columnCellMetaData.componentName"
            :value="item"
            v-bind="header.columnCellMetaData.props"
            :dataSelectorKey="header.value"
          ></component>

          <!-- <span v-else :key="'dataTable' + index">
            {{ getValue(item, header.value) }}
          </span> -->
        </slot>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          v-if="editBtnData"
          :disabled="disabled"
          small
          @click="handleEditClick(item)"
        >
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
import { Component, Prop, Vue } from "vue-property-decorator";
import { VBtn, VDataTable } from "vuetify/lib/components";
import FAddBtn from "../FAddBtn.vue";
import * as Snackbar from "node-snackbar";
import FCellLink from "./cell/FCellLink.vue";
import FCellBtn from "./cell/FCellBtn.vue";
import FCellINR from "./cell/FCellINR.vue";
import FCellText from "./cell/FCellText.vue";
import FCellStatus from "./cell/FCellStatus.vue";
import FCellDate from "./cell/FCellDate.vue";
import ModelVue from "../ModelVue";
import { FTableActionField } from "./FDataTableMDP";
import FBtn from "../FBtn.vue";
import FTextInfo from "./info/FTextInfo.vue";

@Component({
  components: {
    VBtn,
    FAddBtn,
    FCellLink,
    FCellBtn,
    FCellINR,
    FCellText,
    FCellStatus,
    FCellDate,
    FBtn,
    FTextInfo
  },
})
export default class FDataTable extends ModelVue {
  @Prop({
    default: () => [],
  })
  columnList: any[];

  @Prop()
  myRefName: string;

  @Prop()
  dataSelectorKey: string;

  @Prop()
  enableSearch: boolean;

  @Prop()
  multiSelect: boolean;

  @Prop({
    default: () => [],
  })
  actions: any[];

  @Prop({
    default: () => [],
  })
  infoList: any[];

  

  @Prop({
    default: false,
  })
  disabled: boolean;

  @Prop({
    default: null,
  })
  title: string;

  @Prop({
    default: null,
  })
  itemKey: string;

  search = "";
  showConfirmation: boolean = false;
  selectedItems: any = [];
  selectedAction: FTableActionField;

  getValue(item: any, path: any) {
    return path.split(".").reduce((res: any, prop: any) => res[prop], item);
  }

  handleSelectChange(newVal: any) {
    this.showConfirmation = false;
    this.selectedItems = newVal;
  }

  actionClicked(action: FTableActionField) {
    this.selectedAction = action;
    if (action.confirmation === true) {
      this.showConfirmation = true;
    } else {
      this.handleActionClick();
    }
  }

  handleActionClick() {
    this.showConfirmation = false;
    if (this.multiSelect) {
      this.selectedAction.onClick(this.selectedItems).then((res: any) => {
        this.clearSelectedItems();
      });
    } else {
      this.selectedAction.onClick(this.selectedItems[0]).then((res: any) => {
        this.clearSelectedItems();
      });
    }
  }

  handleDeleteClick(item: any) {
    // const deleteAction = this.actions.find(item => item.type===ActionType.DELETE);
    this.deleteBtnData.onClick(item);
  }

  handleEditClick(item: any) {
    const editAction = this.actions.find(
      (item) => item.type === ActionType.EDIT
    );
    editAction.onClick(item);
  }

  get deleteBtnData() {
    return this.actions.find((item) => item.type === ActionType.DELETE);
  }

  get editBtnData() {
    return this.actions.find((item) => item.type === ActionType.EDIT);
  }

  get addBtnData() {
    return this.actions.find((item) => item.type === ActionType.ADD);
  }

  get filteredHeaders() {
    const headers = [...this.columnList];
    if (this.deleteBtnData || this.editBtnData) {
      headers.push({ text: "", value: "actions", align: "right" });
    }

    return headers;
  }

  get filteredActions() {
    return this.actions.filter((item) => item.type === ActionType.OTHERS);
  }

  get showCheckbox() {
    const otherActions = this.actions.filter(
      (item) => item.type === ActionType.OTHERS
    );
    return (
      otherActions.filter((item) => !item.disabled).length > 0 && !this.disabled
    );
  }

  get modelValue(): any {
    return this.value || [];
  }

  set modelValue(newModelValue: any) {
    this.$emit("input", newModelValue);
  }

  clearSelectedItems() {
    this.selectedItems = [];
  }
}

export enum ActionType {
  ADD = "ADD",
  DELETE = "DELETE",
  EDIT = "EDIT",
  OTHERS = "OTHERS",
}
</script>
