<template>
  <div>
    <component
      v-if="addCreditorDialog"
      :is="addCreditorFormMetaData.componentName"
      :ref="addCreditorFormMetaData.myRef"
      v-model="addCreditorForm"
      v-bind="addCreditorFormMetaData.props"
    ></component>

    <component
      :is="editCreditorFormMetaData.componentName"
      :ref="editCreditorFormMetaData.myRef"
      v-model="editCreditorForm"
      v-bind="editCreditorFormMetaData.props"
    ></component>

    <v-col class="col-12">
      <!--GRID START-->
      <v-card flat outlined>
        <v-data-table
          :headers="headers"
          :items="modelValue"
          sort-by="lastDateOfPayment"
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
        </v-data-table>
      </v-card>
      <!--GRID END-->
      <!--ACTION START-->

      <!--ACTION END-->
    </v-col>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
@Component({
  components: {
    FForm,
  },
})
export default class CCITCreditorStep extends ModelVue {
  addCreditorForm = {};
  editCreditorForm = {};

  headers = [
    {
      text: "Creditor",
      align: "start",
      sortable: false,
      value: "creditor",
    },
    { text: "Creditor Balance", value: "creditorBalance" },
    { text: "Last Date Of Payment", value: "lastDateOfPayment" },
    { text: "Debt Type", value: "debtType" },
    { text: "Account Number", value: "accountNumber" },
    { text: "Actions", value: "actions" },
  ];

  addCreditorDialog = false;

  showAddForm() {
    this.addCreditorDialog = true;
  }

  @Prop()
  addCreditorFormMetaData: any;

  @Prop()
  editCreditorFormMetaData: any;

  @Prop()
  actionMetaDataList: any[];

  @Prop()
  disabled: boolean;
}
</script>
