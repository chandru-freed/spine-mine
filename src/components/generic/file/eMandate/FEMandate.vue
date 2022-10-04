<template>
  <div ref="eMandateListRef">
    <component
      v-if="addEMandateDialog"
      :is="addEMandateFormMetaData.componentName"
      :ref="addEMandateFormMetaData.myRefName"
      :value="selectModel(addEMandateForm, undefined)"
      @input="(newValue) => updateModel(addEMandateForm, newValue, undefined)"
      v-bind="addEMandateFormMetaData.props"
    ></component>

    <v-alert text color="error" v-if="deleteEMandateDialog">
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
          :on-click="deleteEMandateData"
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
          :items="eMandateList"
          sort-by="lastDateOfPayment"
          class="elevation-0"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Bank</v-toolbar-title>
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
              @click="selectDeleteEMandate(item, index)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <!--GRID END-->
      <!--ACTION START-->
      <div
        class="d-flex flex-row align-start flex-wrap justify-space-around pa-2 my-5"
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
import store, * as Store from "@/../src-gen/store";
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
export default class FEMandate extends ModelVue {
  addEMandateForm: Data.Spine.EMandateAddForm =
    new Data.Spine.EMandateAddForm();

  selectedEMandateItem: Data.Spine.EMandateDetails;
  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  clientFileSummary: Data.ClientFile.FileSummary;
  headers = [
    {
      text: "Account Holder Name",
      align: "start",
      sortable: false,
      value: "accountHolderName",
    },
    { text: "Account Number", value: "accountNumber" },
    { text: "Actions", value: "actions" },
  ];

  addEMandateDialog = false;
  deleteEMandateDialog = false;
  taskId = this.$route.params.taskId;

  @Prop()
  addEMandateFormMetaData: any;

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
    this.addEMandateDialog = true;
  }

  showDeletePopup() {
    this.closeAndClearAllForms();
    this.deleteEMandateDialog = true;
  }
  closeAndClearAllForms() {
    this.closeDialogs();
    this.resetForms();
  }
  closeDialogs() {
    this.addEMandateDialog = false;
    this.deleteEMandateDialog = false;
  }
  resetForms() {
    this.addEMandateForm = new Data.Spine.EMandateAddForm();
  }

  get eMandateList() {
    return this.modelValue;
  }

  deleteEMandateData() {
    const eMandateId = this.selectedEMandateItem.eMandateId;
    Action.Spine.RemoveEMandate.execute2(this.taskId, eMandateId, (output) => {
      this.closeDialogs();
      Snackbar.show({
        text: "Succesfully Removed",
        pos: "bottom-center",
      });
    });
  }

  selectDeleteEMandate(item: any, index: number) {
    this.selectedEMandateItem = item;
    this.showDeletePopup();
    console.log(this.deleteEMandateDialog);
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

  populateEMandateBankDetails(details: any) {
    this.addEMandateForm.bankAddress.addressLine1 = details.ADDRESS;
    this.addEMandateForm.bankAddress.city = details.CITY;
    this.addEMandateForm.bankAddress.state = details.STATE;
    this.addEMandateForm.bankAddress.country = "India";
  }
}
</script>
