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
      :items="tableData()"
      class="elevation-0"
      :show-select="showCheckbox"
      :single-select="!multiSelect"
      v-bind="$props"
      :disabled="disabled"
      :itemKey="itemKey"
      :search="search"
      checkbox-color="primary"
    >
      <template
        v-if="
          title ||
          actions.length > 0 ||
          enableSearch ||
          infoMetaDataList.length > 0
        "
        v-slot:top
      >
        <v-toolbar class="mx-1 py-0 ma-0" flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-divider v-if="title" vertical class="mx-3" inset />
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
            style="width: 180px"
          ></v-text-field>

          <v-btn
            v-if="enableExport"
            icon
            color="primary"
            toas="Export as csv"
            @click="exportAsCsv"
          >
            <v-icon>mdi-file-excel-outline</v-icon>
          </v-btn>

          <!-- Show and Hide Headers -->
          <div v-if="enableShowHideColumns">
            <v-menu z-index="99999" offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on }">
                <v-icon color="primary" v-on="on" >
                  mdi-eye-outline
                </v-icon>
              </template>
              <v-list max-height="400px"  class="pa-3 " dense>
                <v-list-tile v-for="(item, index) in columnList" :key="index">
                  <!-- <v-list-tile-action> -->
                    <v-checkbox
                      v-model="selectedColumnListToView"
                      :value="item"
                      :label="item.text"
                    ></v-checkbox>
                  <!-- </v-list-tile-action> -->
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
          <!-- Show and Hide Headers -->

          <v-btn
            v-if="columnFilterList.length > 0"
            icon
            @click="filterButtonPressed()"
            color="primary"
          >
            <v-icon>
              {{ showFilterForm ? "mdi-filter" : "mdi-filter-outline" }}
            </v-icon>
          </v-btn>
        </v-toolbar>

        <!-- Filters -->
        <v-toolbar flat class="align-right" v-if="showFilterForm">
          <v-spacer />
          <div
            v-for="(filter, index) in columnFilterList"
            :key="filter.dataSelectorKey"
          >
            <v-row class="mx-1">
              <v-select
                v-if="columnFilterListWithValues.length > 0"
                outlined
                dense
                hide-details
                multiple
                :items="filter.filterItems"
                class="mx-2"
                :label="filter.label"
                v-model="columnFilterListWithValues[index].value"
                :itemValue="filter.itemKey"
                :item-text="filter.itemText"
                @input="applyTableFilter()"
              >
              </v-select>
            </v-row>
          </div>

          <!-- <v-btn class="mx-2" outlined @click="clearTableFilter()"
            >Clear Filter</v-btn
          > -->
        </v-toolbar>

        <!-- Filters -->
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
        <div class="d-flex">
          <v-btn
            :disabled="disabled"
            icon
            @click="handleEditClick(item, index)"
            v-if="editBtnData"
          >
            <v-icon small> mdi-pencil </v-icon>
          </v-btn>
          <v-btn
            icon
            :disabled="disabled"
            @click="handleDeleteClick(item, index)"
            v-if="deleteBtnData"
          >
            <v-icon small> mdi-delete </v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
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
import FCellUppercase from "./cell/FCellUppercase.vue";
import FCellDayPastDue from "./cell/FCellDayPastDue.vue";
import FCellSLA from "./cell/FCellSLA.vue";
import FCellCurrencyBtn from "./cell/FCellCurrencyBtn.vue";
import * as Json2csv from "json2csv";
import { filter } from "vue/types/umd";
import FCellTextEllipsis from "./cell/FCellTextEllipsis.vue";

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
    FCellName,
    FCellUppercase,
    FCellDayPastDue,
    FCellSLA,
    FCellCurrencyBtn,
    FCellTextEllipsis
  },
})
export default class FDataTable extends ModelVue {
  @Prop({
    default: () => [],
  })
  columnList: any[];

  selectedColumnListToView: any[] = [];

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
    default: false,
  })
  enableExport: boolean;

  @Prop({
    default: false,
  })
  enableShowHideColumns: boolean;

  @Prop({
    default: null,
  })
  title: string;

  @Prop({
    default: null,
  })
  itemKey: string;

  @Prop({
    default: () => [],
  })
  columnFilterList: any[];

  search = "";
  showConfirmation: boolean = false;
  showDeleteConfirmation: boolean = false;
  selectedItemList: any[] = [];
  selectedItemForDelete: any;
  selectedAction: FTableActionField;
  selectedRowIndex: number | undefined;
  columnFilterListWithValues: any[] = [];
  showFilterForm: boolean = false;
  filteredTableData: any = [];

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
    this.deleteBtnData
      .onClick(this.selectedItemForDelete, this.selectedRowIndex)
      .then((res) => {
        this.clearSelectedItems();
      });
  }

  handleDeleteClick(item: any, index?: number) {
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
      (this.selectedItemList.length == 0 ||
        this.disabled ||
        action.disabled ||
        (this.selectedItemList.length > 1 && action.singleSelect)) &&
      !action.noSelect
    );
  }

  handleEditClick(item: any, index: number) {
    this.selectedRowIndex = index;
    this.editBtnData.onClick(item, index);
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
    let headers = [...this.columnList];
    headers = headers.filter((item) => {
      return this.selectedColumnListToView.find((viewItem) => {
        return item.value === viewItem.value;
      });
    });
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
    // return this.filteredTableData || [];
  }

  set modelValue(newModelValue: any) {
    this.$emit("input", newModelValue);
  }

  clearSelectedItems() {
    this.selectedItemList = [];
  }

  private exportAsCsv() {
    const filteredValue = this.showFilterForm?this.filteredTableData:this.modelValue;
    const fields = this.filteredHeaders.map((obj) => {
      return { value: obj.value, label: obj.text };
    });
    const json2csvParser = new Json2csv.Parser({ fields });
    const csv = json2csvParser.parse(filteredValue);

    const filename = "Export_" + new Date().getTime() + ".csv";
    const charset = "utf-8";
    const blob = new Blob([csv], {
      type: "text/csv;charset=" + charset + ";",
    });
    if ((window.navigator as any).msSaveOrOpenBlob) {
      (window.navigator as any).msSaveBlob(blob, filename);
    } else {
      const link = document.createElement("a");
      link.setAttribute("href", window.URL.createObjectURL(blob));
      link.setAttribute("download", `${filename}`);
      link.setAttribute("target", "_blank");
      document.body.appendChild(link); // Required for FF
      link.click();
    }
  }

  filterButtonPressed() {
    if (this.showFilterForm === true) {
      this.clearTableFilter();
    } else {
      this.showFilterForm = true;
      this.filteredTableData = this.selectModel(
        this.modelValue,
        this.dataSelectorKey
      );
    }
  }

  applyTableFilter() {
    let filteredData = [...this.value];
    this.columnFilterListWithValues.forEach((item) => {
      filteredData = filteredData.filter((model: any) => {
        if (item.value.length > 0) {
          return item.value.includes(
            this.selectModel(model, item.dataSelectorKey)
          );
        } else {
          return true;
        }
      });
    });
    this.filteredTableData = this.selectModel(
      filteredData,
      this.dataSelectorKey
    );
  }

  clearTableFilter() {
    this.showFilterForm = false;
    this.filteredTableData = this.selectModel(
      this.modelValue,
      this.dataSelectorKey
    );
    this.columnFilterListWithValues = this.columnFilterList;
  }

  mounted() {
    this.selectedColumnListToView = this.columnList;
    this.columnFilterListWithValues = this.columnFilterList.map((filter) => {
      return { ...filter, value: [] };
    });
  }

  tableData(): any {
    return this.showFilterForm
      ? this.filteredTableData
      : this.selectModel(this.modelValue, this.dataSelectorKey);
  }
}

export enum ActionType {
  ADD = "ADD",
  DELETE = "DELETE",
  EDIT = "EDIT",
  OTHERS = "OTHERS",
}
</script>
