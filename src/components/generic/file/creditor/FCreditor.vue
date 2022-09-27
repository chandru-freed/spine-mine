
<template>
  <div ref="creditorListRef">
    <component
      v-if="addCreditorDialog"
      :is="addCreditorFormMetaData.componentName"
      :ref="addCreditorFormMetaData.myRefName"
      :value="selectModel(addCreditorForm, undefined)"
      @input="(newValue) => updateModel(addCreditorForm, newValue, undefined)"
      v-bind="addCreditorFormMetaData.props"
    ></component>

    <component
      v-if="editCreditorDialog"
      :is="editCreditorFormMetaData.componentName"
      :ref="editCreditorFormMetaData.myRefName"
      :value="selectModel(editCreditorForm, undefined)"
      @input="(newValue) => updateModel(editCreditorForm, newValue, undefined)"
      v-bind="editCreditorFormMetaData.props"
    ></component>

    <v-alert text color="error" v-if="deleteCreditorDialog">
      <div class="text-center py-3">Are you sure want to delete?</div>
      <div
        class="d-flex flex-row align-start flex-wrap justify-space-around pa-2"
      >
        <FBtn
          label="Cancel"
          :on-click="closeAndClearAllForms"
          outlined
          color="red"
        />
        <FBtn
          label="Delete"
          :on-click="deleteCreditorData"
          outlined
          color="red"
        />
      </div>
    </v-alert>

    <v-col class="col-12">
      <!--GRID START-->
      <v-card flat outlined>
        <v-data-table
          :headers="filteredHeaders"
          :items="creditorList"
          sort-by="lastDateOfPayment"
          class="elevation-0"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Creditors</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-chip label outlined color="primary"
                >Total Debt - ₹{{ totalDebtAmount() }}</v-chip
              >
              <v-spacer></v-spacer>
              <v-btn
                :disabled="disabled"
                icon
                color="primary"
                class="mb-2"
                @click="showAddForm"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item, index }">
            <v-icon
              :disabled="disabled"
              small
              class="mr-2"
              @click="selectEditCreditor(item, index)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              :disabled="disabled"
              small
              @click="selectDeleteCreditor(item, index)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <!--GRID END-->
      <!--ACTION START-->
      <div
        class="
          d-flex
          flex-row
          align-start
          flex-wrap
          justify-space-around
          pa-2
          my-5
        "
        v-if="!disabled"
      >
        <component
          v-for="(actionMetaData, index) of actionMetaDataListFiltered"
          :key="'action' + index"
          :is="actionMetaData.componentName"
          :ref="actionMetaData.myRefName"
          v-bind="actionMetaData.props"
        ></component>
      </div>
      <!--ACTION END-->
    </v-col>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import FBtn from "@/components/generic/FBtn.vue";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";

@Component({
  components: {
    FForm,
    FBtn,
  },
})
export default class FCreditor extends ModelVue {
  addCreditorForm: Data.Spine.Creditor = new Data.Spine.Creditor();
  editCreditorForm: Data.Spine.Creditor = new Data.Spine.Creditor();
  selectedCreditorItem: Data.Spine.Creditor;
  headers = [
    {
      text: "Creditor Name",
      align: "start",
      sortable: false,
      value: "creditorName",
    },
    { text: "Creditor Balance", value: "creditorBalance" },
    { text: "Last Date Of Payment", value: "lastDateOfPayment" },
    { text: "Debt Type", value: "debtType" },
    { text: "Account Number", value: "accountNumber" },
    { text: "Actions", value: "actions" },
  ];

  addCreditorDialog = false;
  editCreditorDialog = false;
  deleteCreditorDialog = false;

  @Prop()
  addCreditorFormMetaData: any;

  @Prop()
  editCreditorFormMetaData: any;

  @Prop()
  actionMetaDataList: any[];

  @Prop()
  disabled: boolean;

  @Prop()
  readonly: boolean;

  @Prop()
  taskRoot: any;

  showAddForm() {
    this.closeDialogs();
    this.addCreditorDialog = true;
  }

  showEditForm() {
    this.closeDialogs();
    this.editCreditorDialog = true;
  }
  showDeletePopup() {
    this.closeAndClearAllForms();
    this.deleteCreditorDialog = true;
  }
  closeAndClearAllForms() {
    this.closeDialogs();
    this.resetForms();
  }
  closeDialogs() {
    this.addCreditorDialog = false;
    this.editCreditorDialog = false;
    this.deleteCreditorDialog = false;
  }
  resetForms() {
    this.addCreditorForm = new Data.Spine.Creditor();
    this.editCreditorForm = new Data.Spine.Creditor();
  }

  get creditorList() {
    return this.modelValue.creditorList;
  }

  totalDebtAmount() {
    const totalDebtAmount = this.modelValue.creditorList
      .map((creditor: any) => creditor.creditorBalance)
      .reduce((accumulator: number, objValue: any) => {
        return accumulator + objValue;
      }, 0);
    this.modelValue.totalDebtAmount = totalDebtAmount;
    return this.modelValue.totalDebtAmount;
  }

  addCreditorData(fiCreditorId: string) {
    this.addCreditorForm.fiCreditorId = fiCreditorId;
    (this.creditorList as any).push(this.addCreditorForm);
    this.closeAndClearAllForms();
  }

  editCreditorData() {
    const selectedCreditorIndex = this.creditorList.findIndex(
      (item: any) => item.fiCreditorId == this.selectedCreditorItem.fiCreditorId
    );
    Object.assign(
      this.creditorList[selectedCreditorIndex],
      this.editCreditorForm
    );
    this.closeAndClearAllForms();
  }

  deleteCreditorData() {
    const fiCreditorId = this.selectedCreditorItem.fiCreditorId;
    Action.Spine.RemoveCreditor.execute1(fiCreditorId, (output) => {
      const selectedCreditorIndex = this.creditorList.findIndex(
        (item: any) =>
          item.fiCreditorId == this.selectedCreditorItem.fiCreditorId
      );
      this.creditorList.splice(selectedCreditorIndex, 1);
      this.closeDialogs();
      Snackbar.show({
        text: "Succesfully Removed",
        pos: "bottom-center",
      });
    });
  }

  selectEditCreditor(item: any, index: any) {
    this.selectedCreditorItem = item;
    this.editCreditorForm = {
      ...item,
    };
    this.showEditForm();
  }
  selectDeleteCreditor(item: any, index: number) {
    this.selectedCreditorItem = item;
    this.showDeletePopup();
    console.log(this.deleteCreditorDialog);
  }

  get filteredHeaders() {
    if (this.readonly === true) {
      return this.headers.filter((item) => item.value !== "actions");
    }
    return this.headers;
  }

  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }
}
</script>
