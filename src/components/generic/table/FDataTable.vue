<template>
  <v-card :ref="myRefName" flat outlined>
    <f-alert
      message="Are you sure want to proceed?"
      @confirmClick="fireActionClick"
      @cancelClick="showConfirmation = false"
      v-if="showConfirmation == true"
    />

    <f-alert
      message="Are you sure want to delete?"
      @confirmClick="fireDeleteActionClick"
      @cancelClick="showDeleteConfirmation = false"
      v-if="showDeleteConfirmation == true"
      color="red"
    />

    <v-data-table
      :value="selectedItemList"
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
          <v-divider vertical class="mx-3" inset />
          <div
            v-for="(info, index) in infoMetaDataList"
            :key="info.label + index"
          >
            <component
              :is="info.infoMetaData.componentName"
              :value="info.value"
              :label="info.label"
              v-bind="info.infoMetaData.props"
              class="mx-1"
            ></component>
          </div>
          <v-spacer />
          <div v-if="filteredActions.length > 0">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  dense
                  small
                  outlined
                >
                  Actions
                  <v-icon small>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(action, index) in filteredActions"
                  :key="index"
                  link
                  :disabled="isActionDisabled(action)"
                  @click="() => handleOtherActionClick(action)"
                >
                  <v-list-item-title>{{ action.label }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div v-else class="d-flex">
            <v-btn
              v-for="(action, index) in filteredActions"
              :key="'action' + index"
              outlined
              @click="() => handleOtherActionClick(action)"
              small
              class="mx-2"
              color="primary"
              :disabled="
                selectedItemList.length == 0 || disabled || action.disabled
              "
            >
              {{ action.label }}
            </v-btn>
          </div>

          <f-add-btn
            class="ml-3"
            v-if="addBtnData"
            outlined
            :label="addBtnData.label"
            @click="addBtnData.onClick"
            :disabled="disabled || addBtnData.disabled"
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
            class="shrink ml-3"
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
        </slot>
      </template>

      <template v-slot:[`item.actions`]="{ item, index }">
        <v-btn
          :disabled="disabled"
          icon
          @click="handleEditClick(item,index)"
          v-if="editBtnData"
        >
          <v-icon small class="px-1"> mdi-pencil </v-icon>
        </v-btn>
        <v-btn
          icon
          :disabled="disabled"
          @click="handleDeleteClick(item,index)"
          v-if="deleteBtnData"
        >
          <v-icon small class="px-1"> mdi-delete </v-icon>
        </v-btn>
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
import FCellCurrency from "./cell/FCellCurrency.vue";
import FCellText from "./cell/FCellText.vue";
import FCellStatus from "./cell/FCellStatus.vue";
import FCellDate from "./cell/FCellDate.vue";
import ModelVue from "../ModelVue";
import { FTableActionField } from "./FDataTableMDP";
import FBtn from "../FBtn.vue";
import FInfoText from "./info/FInfoText.vue";
import FInfoINR from "./info/FInfoINR.vue";
import FAlert from "../FAlert.vue";
import FCellPhone from "./cell/FCellPhone.vue";
import FCellEmail from "./cell/FCellEmail.vue";
import FCellTask from "./cell/FCellTask.vue";
import FCellDateTime from "./cell/FCellDateTime.vue";
import FCellTaskStatus from "./cell/FCellTaskStatus.vue";
import FCellName from "./cell/FCellName.vue";

@Component({
  components: {
    VBtn,
    FAddBtn,
    FCellLink,
    FCellBtn,
    FCellCurrency,
    FCellText,
    FCellStatus,
    FCellDate,
    FBtn,
    FInfoText,
    FInfoINR,
    FAlert,
    FCellPhone,
    FCellEmail,
    FCellTask,
    FCellDateTime,
    FCellTaskStatus,
    FCellName
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
  infoMetaDataList: any[];

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
  showDeleteConfirmation: boolean = false;
  selectedItemList: any[] = [];
  selectedItemForDelete: any;
  selectedAction: FTableActionField;
  selectedRowIndex: number | undefined;

  getValue(item: any, path: any) {
    return path.split(".").reduce((res: any, prop: any) => res[prop], item);
  }

  handleSelectChange(newVal: any) {
    this.showConfirmation = false;
    this.selectedItemList = newVal;
  }

  handleOtherActionClick(action: FTableActionField) {
    this.selectedAction = action;
    if (action.confirmation === true) {
      this.showConfirmation = true;
    } else {
      this.fireActionClick();
    }
  }

  fireActionClick() {
    this.showConfirmation = false;
    if (
      this.multiSelect &&
      !this.selectedAction.singleSelect &&
      this.selectedAction.type === ActionType.OTHERS
    ) {
      this.selectedAction.onClick(this.selectedItemList).then((res: any) => {
        this.clearSelectedItems();
      });
    } else {
      this.selectedAction.onClick(this.selectedItemList[0]).then((res: any) => {
        this.clearSelectedItems();
      });
    }
  }

  fireDeleteActionClick() {
    this.showDeleteConfirmation = false;
    this.deleteBtnData.onClick(this.selectedItemForDelete,this.selectedRowIndex).then((res) => {
      this.clearSelectedItems();
    });
  }

  handleDeleteClick(item: any,index?: number) {
    this.selectedAction = this.deleteBtnData;
    this.selectedItemForDelete = item;
    this.selectedRowIndex = index;
    if (this.selectedAction.confirmation === true) {
      this.showDeleteConfirmation = true;
    } else {
      this.fireDeleteActionClick();
    }
    // this.deleteBtnData.onClick(item);
  }

  isActionDisabled(action: FTableActionField) {
    return (
      this.selectedItemList.length == 0 ||
      this.disabled ||
      action.disabled ||
      (this.selectedItemList.length > 1 && action.singleSelect)
    );
  }

  handleEditClick(item: any, index: number) {
    this.selectedRowIndex = index;
    this.editBtnData.onClick(item,index);
  }

  get deleteBtnData(): FTableActionField {
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
    this.selectedItemList = [];
  }
}

export enum ActionType {
  ADD = "ADD",
  DELETE = "DELETE",
  EDIT = "EDIT",
  OTHERS = "OTHERS",
}
</script>
