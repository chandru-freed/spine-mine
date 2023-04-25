<template>
  <v-card :ref="myRefName" flat :outlined="outlined">
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
      :expanded.sync="expanded"
      :show-expand="!!expansionComponent"
      :hide-default-footer="hideDefaultFooter"
      :disable-pagination="!enablePagination"
      :loading="loading"
      :group-by="groupBy.value"
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
          <slot name="top-action"></slot>
          
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
                  dense
                >
                  <div class="text-caption">{{ action.label }}</div>
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

          <v-btn
            icon
            v-if="refreshBtnData"
            @click="refreshBtnData.onClick"
            :disabled="disabled || refreshBtnData.disabled"
            class="ml-2"
          >
            <v-icon color="primary">mdi-refresh</v-icon>
          </v-btn>
          <f-add-btn
            class="ml-2"
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

          <v-menu
            v-model="showMoreActionsMenu"
            :close-on-content-click="false"
            location="bottom"
            :offset-y="true"
            left
            top
          >
            <template v-slot:activator="{ on, props }">
              <v-btn
                class="ml-1"
                color="primary"
                v-bind="props"
                icon
                small
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-card min-width="180">
              <v-toolbar>
                <v-btn
                  v-if="enableExport"
                  icon
                  small
                  class="mx-2"
                  color="primary"
                  toas="Export as csv"
                  @click="exportAsCsv"
                >
                  <v-icon size="20">mdi-file-excel-outline</v-icon>
                </v-btn>

                <!-- Show and Hide Headers -->
                <div v-if="enableShowHideColumns">
                  <v-menu
                    z-index="99999"
                    :offset-y="true"
                    bottom
                    :close-on-content-click="false"
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" icon class="mx-2" small>
                        <v-icon class="mx-2" color="primary" size="20">
                          mdi-flip-horizontal
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-card max-height="400px">
                      <v-list dense>
                        <v-list-item
                          v-for="(item, index) in columnList"
                          :key="index"
                        >
                          <v-checkbox
                            v-model="selectedColumnListToView"
                            :value="item"
                            :label="item.text"
                            :hide-details="true"
                            dense
                          >
                            <template v-slot:label>
                              <span class="text-caption">
                              {{item.text}}
                              </span>
                            </template>
                          </v-checkbox>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-menu>
                </div>
                <!-- Show and Hide Headers -->

                <!-- Group By Headers -->
                <div v-if="groupByList.length > 0">
                  <v-menu z-index="99999" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn class="mx-2" v-on="on" icon small>
                        <v-icon color="primary" size="20">
                          mdi-format-list-group
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-card max-height="400px">
                      <v-list dense>
                        <v-list-item
                          v-for="(item, index) in groupByList"
                          :key="index"
                          @click="handleGroupBySelect(item)"
                          class="text-caption"
                        >
                          {{ item.text }}
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-menu>
                </div>
                <!-- Group By Headers -->

                <v-btn
                  v-if="columnFilterList.length > 0"
                  icon
                  @click="filterButtonPressed()"
                  color="primary"
                  small
                  class="mx-2"
                >
                  <v-icon size="20">
                    {{ showFilterForm ? "mdi-filter" : "mdi-filter-outline" }}
                  </v-icon>
                </v-btn>
              </v-toolbar>
            </v-card>
          </v-menu>
        </v-toolbar>

        <!-- Filters -->
        <v-toolbar flat class="align-right" v-if="showFilterForm">
          <v-chip small outlined label color="primary"
            >Total: {{ tableData().length }} / {{selectModel(modelValue, dataSelectorKey).length }}</v-chip
          >
          <v-spacer />
          <div
            v-for="(filter, index) in columnFilterList"
            :key="filter.dataSelectorKey"
          >
            <v-row v-if="!filter.booleanFilter" class="mx-1">
              <v-select
                v-if="columnFilterListWithValues.length > 0"
                outlined
                dense
                small-chips
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
            <div v-if="filter.booleanFilter" class="mx-1">
              <v-switch
                :label="filter.label"
                v-model="columnFilterListWithValues[index].value"
                @change="applyTableFilter()"
              >
              </v-switch>
            </div>
          </div>

          <v-btn class="ml-3" small icon @click="filterButtonPressed()">
            <v-icon small>
              mdi-close-circle
            </v-icon>
          </v-btn>

          <!-- <v-btn class="mx-2" outlined @click="clearTableFilter()"
            >Clear Filter</v-btn
          > -->
        </v-toolbar>

        <!-- Filters -->
      </template>
      <template
        v-slot:[`group.header`]="{ group, headers, toggle, isOpen, items }"
      >
        <td v-if="groupBy !== null" :colspan="headers.length">
          <v-btn small @click="toggle" x-small icon :ref="group">
            <v-icon small v-if="isOpen">mdi-minus</v-icon>
            <v-icon small v-else>mdi-plus</v-icon>
          </v-btn>
          <span class="mx-5  text-caption"
            >{{ groupBy.label }} ( {{ items.length }} ) : {{ group }}</span
          >

          <span class="mx-3 text-caption" v-if="groupBySummaryFunction"
            ><strong>{{ groupBySummaryFunction(items) }}</strong></span
          >
          <v-btn small icon @click="resetGroupBy"><v-icon small>mdi-close</v-icon></v-btn>
        </td>
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
          <f-copy
            v-if="header.enableCopy&&!!selectModel(item, header.value)"
            :value="selectModel(item, header.value)"
          >
          </f-copy>
        </slot>
      </template>

      <template v-slot:[`item.siNo`]="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:[`item.actions`]="{ item, index }">
        <div class="d-flex">
          <v-btn
            :disabled="disabled"
            icon
            @click="handleInfoClick(item, index)"
            v-if="infoBtnData"
          >
            <v-icon small> mdi-information</v-icon>
          </v-btn>
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
      <!-- Expansion component -->
      <template
        v-if="expansionComponent"
        v-slot:expanded-item="{ headers, item }"
      >
        <td :colspan="headers.length" class="pa-0">
          <component
            class="my-5"
            :is="expansionComponent.componentName"
            :value="item"
            v-bind="expansionComponent.props"
          ></component>
        </td>
      </template>
      <!-- Expansion component -->
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
import FCellDateTimeEllipsis from "./cell/FCellDateTimeEllipsis.vue";
import FExpansionText from "./expansion/FExpansionText.vue";
import FTableExpansionMDP from "./FTableExpansionMDP";
import FCellBoolean from "./cell/FCellBoolean.vue";
import FCellOutOfTotal from "./cell/FCellOutOfTotal.vue";
import FCellBlank from "./cell/FCellBlank.vue";
import FCellBooleanList from "./cell/FCellBooleanList.vue";
import FCellList from "./cell/FCellList.vue";
import FCellCopy from "./cell/FCellCopy.vue";
import FCellStandardDateTime from "./cell/FCellStandardDateTime.vue";
import FCellAmountPaymentList from "./cell/FCellAmountPaymentList.vue";
import FHoverCopy from "../FHoverCopy.vue";
import FForm from "../form/FForm.vue";
import FExpansionFDataTable from "./expansion/FExpansionFDataTable.vue";
import FCopy from "../FCopyBtn.vue";
import FCellRouterLink from "./cell/FCellRouterLink.vue";
import FCellBtnPreview from "./cell/FCellBtnPreview.vue";
import FCellUrlLink from "./cell/FCellUrlLink.vue";

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
    FCellTextEllipsis,
    FCellDateTimeEllipsis,
    FExpansionText,
    FCellBoolean,
    FCellOutOfTotal,
    FCellBlank,
    FCellBooleanList,
    FCellList,
    FCellCopy,
    FCellStandardDateTime,
    FCellAmountPaymentList,
    FHoverCopy,
    FForm,
    FExpansionFDataTable,
    FCopy,
    FCellRouterLink,
    FCellBtnPreview,
    FCellUrlLink
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

  @Prop()
  outlined: boolean;

  @Prop({
    default: () => [],
  })
  actions: any[];

  @Prop({
    default: () => [],
  })
  infoMetaDataList: any[];

  @Prop()
  groupBySummaryFunction: (itemList: any) => any;

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
    default: false,
  })
  hideDefaultFooter: boolean;

  @Prop({
    default: false,
  })
  loading: boolean;

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

  @Prop()
  expansionComponent: any;

  @Prop()
  enableSerialNumber: any;

  @Prop()
  enablePagination: boolean;

  expanded: any = [];
  groupBy: any = {
    label: null,
    value: null,
  };

  search = "";
  showConfirmation: boolean = false;
  showMoreActionsMenu: boolean = false;
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

  handleInfoClick(item: any, index: number) {
    this.selectedRowIndex = index;
    this.infoBtnData.onClick(item, index);
  }

  get deleteBtnData(): FTableActionField {
    return this.actions.find((item) => item.type === ActionType.DELETE);
  }

  get infoBtnData() {
    return this.actions.find((item) => item.type === ActionType.INFO);
  }

  get editBtnData() {
    return this.actions.find((item) => item.type === ActionType.EDIT);
  }

  get addBtnData() {
    return this.actions.find((item) => item.type === ActionType.ADD);
  }

  get refreshBtnData() {
    return this.actions.find((item) => item.type === ActionType.REFRESH);
  }

  get filteredHeaders() {
    let headers = [...this.columnList];
    headers = headers.filter((item) => {
      return this.selectedColumnListToView.find((viewItem) => {
        return item.value === viewItem.value;
      });
    });
    if (this.deleteBtnData || this.editBtnData || this.infoBtnData) {
      headers.push({ text: "", value: "actions", align: "right" });
    }
    if (this.expansionComponent) {
      headers.push({ text: "", value: "data-table-expand", width: "3%" });
    }

    if (this.enableSerialNumber) {
      headers.unshift({ text: "Si No", value: "siNo", align: "left" });
    }

    return headers;
  }

  get groupByList() {
    let headerList = [...this.columnList];
    return headerList.filter((header) => header.enableGroupBy);
  }

  get filteredActions() {
    return this.actions.filter((item) => item.type === ActionType.OTHERS);
  }

  get showCheckbox() {
    const otherActions = this.actions.filter(
      (item) => item.type === ActionType.OTHERS
    );
    return (
      otherActions.filter((item) => !item.disabled && !item.noSelect).length >
        0 && !this.disabled
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
    const filteredValue = this.showFilterForm
      ? this.filteredTableData
      : this.modelValue;
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
    let filteredDataList = [...this.value];
    console.log(this.columnFilterListWithValues);
    for (let columnFilter of this.columnFilterListWithValues) {
      // this.columnFilterListWithValues.forEach((columnFilter) => {
      filteredDataList = filteredDataList.filter((filteredData: any) => {
        if (columnFilter.booleanFilter === true) {
          return (
            columnFilter.value == undefined ||
            columnFilter.value ===
              this.selectModel(filteredData, columnFilter.dataSelectorKey)
          );
        } else if (columnFilter.value.length > 0) {
          return (
            columnFilter.value == undefined ||
            columnFilter.value.includes(
              this.selectModel(filteredData, columnFilter.dataSelectorKey)
            )
          );
        } else {
          return true;
        }
      });
    }
    // });
    this.filteredTableData = this.selectModel(
      filteredDataList,
      this.dataSelectorKey
    );
  }

  clearTableFilter() {
    this.showFilterForm = false;
    this.filteredTableData = this.selectModel(
      this.modelValue,
      this.dataSelectorKey
    );
    this.resetColumnFilterWithValues();
  }

  mounted() {
    this.selectedColumnListToView = this.columnList.filter((column) => {
      return column.hidden === false;
    });
    this.resetColumnFilterWithValues();
  }

  resetColumnFilterWithValues() {
    this.columnFilterListWithValues = this.columnFilterList.map((filter) => {
      return filter.booleanFilter ? { ...filter } : { ...filter, value: [] };
    });
  }

  tableData(): any {
    return this.showFilterForm
      ? this.filteredTableData
      : this.selectModel(this.modelValue, this.dataSelectorKey);
  }

  handleGroupBySelect(item: any) {
    this.groupBy.value = item.value;
    this.groupBy.label = item.text;
  }
  resetGroupBy(item: any) {
    this.groupBy = {
      label: null,
      value: null,
    };
  }
}

export enum ActionType {
  ADD = "ADD",
  DELETE = "DELETE",
  EDIT = "EDIT",
  OTHERS = "OTHERS",
  INFO = "INFO",
  REFRESH = "REFRESH",
}
</script>
