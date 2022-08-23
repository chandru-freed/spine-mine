<template>
  <div ref="creditorListRef">
    <component
      v-if="uploadDocumentDialog"
      :is="uploadDocumentFormMetaData.componentName"
      :ref="uploadDocumentFormMetaData.myRefName"
      v-model="uploadDocumentForm"
      v-bind="uploadDocumentFormMetaData.props"
    ></component>

    <v-alert text color="error" v-if="deleteDocumentDialog">
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
          :on-click="deleteDocument"
          outlined
          color="red"
        />
      </div>
    </v-alert>

    <v-col class="col-12">
      <!--GRID START-->
      <v-card flat outlined>
        <v-data-table
          :headers="headers"
          :items="modelValue"
          class="elevation-0"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Creditors</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
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
              @click="selectDeleteDocument(item, index)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <!--GRID END-->
      <!--ACTION START-->
      <div
        class="d-flex flex-row align-start flex-wrap justify-space-around pa-2"
        v-if="!disabled"
      >
        <component
          v-for="(actionMetaData, index) of actionMetaDataList"
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
@Component({
  components: {
    FForm,
    FBtn,
  },
})
export default class FDocument extends ModelVue {
  uploadDocumentForm = {};

  selectedCreditorIndex: number;
  headers = [
    { text: "Doc Path", value: "documentPath" },
    { text: "DocumentType", value: "documentType"},
    { text: "Uploaded On", value: "uploadedTime" },
    { text: "Actions", value: "actions" },
  ];

  uploadDocumentDialog = false;
  deleteDocumentDialog = false;

  @Prop()
  uploadDocumentFormMetaData: any;

  @Prop()
  actionMetaDataList: any[];

  @Prop()
  disabled: boolean;

  showAddForm() {
    this.closeDialogs();
    this.uploadDocumentDialog = true;
  }

  showDeletePopup() {
    this.closeAndClearAllForms();
    this.deleteDocumentDialog = true;
  }
  closeAndClearAllForms() {
    this.closeDialogs();
    this.resetForms();
  }
  closeDialogs() {
    this.uploadDocumentDialog = false;
    this.deleteDocumentDialog = false;
  }
  resetForms() {
    this.uploadDocumentForm = {};
  }

  uploadDocumentData() {
    (this.modelValue as any).push(this.uploadDocumentForm);
    this.closeAndClearAllForms();
  }

  deleteDocument() {
    this.modelValue.splice(this.selectedCreditorIndex, 1);
    this.closeDialogs();
  }

  selectDeleteDocument(item: any, index: number) {
    this.selectedCreditorIndex = index;
    this.showDeletePopup();
    console.log(this.deleteDocumentDialog);
  }
}
</script>
