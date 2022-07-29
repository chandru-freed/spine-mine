<template>
  <v-row>
    <v-col class="col-12" v-if="addDialog">
      <v-card outlined flat>
        <v-card-text class="pb-0">
            <component
              key="addCreditorFormData"
              :ref="addCreditorFormComponentMetaData.componentRef"
              :is="addCreditorFormComponentMetaData.componentName"
              v-model="addCreditorFormData"
              v-bind="addCreditorFormComponentMetaData.props"
            ></component>
          <!-- <component
              key="addCreditorFormData"
              :ref="addCreditorFormMetaData.componentRef"
              :is="addCreditorFormMetaData.componentName"
              v-model="addCreditorFormData"
              v-bind="addCreditorFormMetaData.props"
            ></component> -->
        </v-card-text>
        <!-- <v-card-actions>
          <v-btn color="primary " text @click="closeAndClearForm">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary "
            @click="submitAddCreditor(addCreditor)"
          >
            Add
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-col>

    <v-col class="col-12" v-if="editDialog">
      <v-card outlined flat>
        <v-card-text class="pb-0">
          <ValidationObserver
          key="editCreditorFormDataV"
            :ref="editCreditorFormComponentMetaData.componentRef"
          >
          <component
            key="editCreditorFormData"
            :ref="editCreditorFormComponentMetaData.componentRef"
            :is="editCreditorFormComponentMetaData.componentName"
            v-model="editCreditorFormData"
            v-bind="editCreditorFormComponentMetaData.props"
          ></component>
          </ValidationObserver>

        </v-card-text>
        <v-card-actions>
          <v-btn color="primary " text @click="closeAndClearForm">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary "
            @click="submitEditCreditor(editCreditor)"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col v-if="deleteDialog">
      <v-alert text color="error">
        <v-row no-gutters>
          <v-col class="col-12">
            <div class="font-weight-bold">
              Are you sure you want to delete ?
            </div>
          </v-col>
          <v-col class="col-12">
            {{ deleteCreditorFormData.creditor }} -
            {{ deleteCreditorFormData.creditorBalance }} -
            {{ deleteCreditorFormData.debtType }}
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-btn color="error " text @click="closeAndClearForm">
              Cancel
            </v-btn>
          </v-col>

          <v-col class="text-right">
            <v-btn outlined color="error " @click="deleteCreditor()">
              Confirm Delete
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-col>
    <v-col class="col-12">
      <v-card flat outlined>
        <v-data-table
          :headers="headers"
          :items="creditorListComputed"
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
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              :disabled="disabled"
              small
              class="mr-2"
              @click="selectEditCreditor(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              :disabled="disabled"
              small
              @click="selectDeleteCreditor(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <v-card-actions>
        <v-row no-gutters>
          <v-col
            v-for="(
              actionComponentMetaData, index
            ) in actionComponentMetaDataList"
            :key="index"
            :class="actionComponentMetaData.boundaryClass"
          >
            <component
              name="index"
              :is="actionComponentMetaData.componentName"
              v-bind="actionComponentMetaData.props"
            >
            </component>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FForm from "@/components/form/FForm.vue";
import FBtn from "@/components/FBtn.vue";
import { ButtonMetaData, FormMetaData, NumberFieldMetaData, SelectFieldMetaData, TextFieldMetaData } from "@/../src-def/form/FormComponentDef";

@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    "f-form": FForm,
    "f-btn": FBtn,
  },
})
export default class FCreditor extends Vue {
  creditorRef = "fCreditorRef"
  //dialogs
  addDialog = false;
  editDialog = false;
  deleteDialog = false;

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

  addCreditorFormData: any = {};
  editCreditorFormData: any = {};
  deleteCreditorFormData: any = {};

  showAddForm() {
    this.addCreditorFormData = {};

    this.editDialog = false;
    this.deleteDialog = false;
    this.addDialog = true;
  }

  showEditForm() {
    this.editDialog = true;
    this.addDialog = false;
    this.deleteDialog = false;
  }

  showDeleteForm() {
    this.editDialog = false;
    this.addDialog = false;
    this.deleteDialog = true;
  }

  closeAndClearForm() {
    this.addDialog = false;
    this.editDialog = false;
    this.deleteDialog = false;
    this.addCreditorFormData = {};
    this.editCreditorFormData = {};
    this.deleteCreditorFormData = {};
  }

  addCreditor() {
    this.creditorList.push(this.addCreditorFormData);
    // this.onChange();// calling saveTask
    this.closeAndClearForm();
  }

  selectEditCreditor(item: any) {
    this.editCreditorFormData = {
      id: this.creditorList.indexOf(item),
      ...item,
    };
    this.showEditForm();
  }

  editCreditor(form: any) {
    Object.assign(
      this.creditorList[this.editCreditorFormData.id],
      this.editCreditorFormData
    );
    // this.onChange();// calling saveTask
    this.closeAndClearForm();
  }

  selectDeleteCreditor(item: any) {
    this.deleteCreditorFormData = {
      id: this.creditorList.indexOf(item),
      ...item,
    };
    this.showDeleteForm();
  }

  deleteCreditor() {
    this.creditorList.splice(this.deleteCreditorFormData.id, 1);
    // this.onChange();// calling saveTask
    this.closeAndClearForm();
  }

  submitAddCreditor() {
    (this.$refs[this.addCreditorFormMetaData.componentRef] as any).onSubmit((form: any) => {
      this.addCreditor();
    });
     
  }

  submitEditCreditor(action: any) {
    (this.$refs[this.editCreditorFormComponentMetaData.componentRef] as any)
      .validate()
      .then((success: boolean) => {
        if (success) {
          action(this.creditorListComputed);
          return;
        } else {
        }
      });
  }

  @Prop({
    default: () => {
      return {};
    },
  })
  addCreditorFormComponentMetaData!: any;

  @Prop({
    default: () => {
      return {};
    },
  })
  editCreditorFormComponentMetaData!: any;

  @Prop({
    default: () => {
      return {};
    },
  })
  actionComponentMetaDataList!: any;

  @Prop({ default: false })
  disabled!: boolean;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Prop({ default: () => {} })
  onChange!: () => void;

  // V-MODEL START
  @Prop({
    default: () => {
      return [];
    },
  })
  value: any[];

  creditorList: any[] = [];

  get creditorListComputed(): any[] {
    return this.creditorList;
  }

  set creditorListComputed(value: any[]) {
    this.creditorList = value;
  }

  // WATCH as the MODEL VALUE is a OBJ -
  // And Fields inside the Object if change does not call set of Computed
  @Watch("creditorList")
  updateMyForm(value: any, oldValue: any) {
    this.$emit("input", value);
  }

  mounted() {
    this.creditorList =
      !!this.value && this.value.length >= 0 ? this.value : [];
  }
  // V-MODEL END

  addFormRefStr = "addCreditorFormRef"

  get addCreditorFormMetaData(): any {
    const addCreditorFormMetaData = new FormMetaData({
      id: "addCreditorForm",
      componentRef: this.addFormRefStr,
      dataSelectorKey: "addCreditorForm",
    });

    addCreditorFormMetaData
      .addField(
        new TextFieldMetaData({
          parentDataProvider: addCreditorFormMetaData,
          dataSelectorKey: "creditor",
          label: "Creditor",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: addCreditorFormMetaData,
          dataSelectorKey: "creditorBalance",
          label: "Creditor Balance",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: addCreditorFormMetaData,
          dataSelectorKey: "lastDateOfPayment",
          label: "Last Date Of Payment",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
          mask: "##/##/####",
          placeholder: "dd/mm/yyyy",
        })
      )
      .addField(
        new SelectFieldMetaData({
          parentDataProvider: addCreditorFormMetaData,
          dataSelectorKey: "debtType",
          label: "Debt Type",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
          options: ["Credit Card", "Personal Loans", "Secured", "Others"],
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: addCreditorFormMetaData,
          dataSelectorKey: "accountNumber",
          label: "Account Number",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
        })
      )
      .addOtherChild(
        new ButtonMetaData({
          id: "addCreditorBtn",
          label: "Add",
          outlined: true,
          onClick: this.submitAddCreditor, // TODO : How to call with validation.
        })
      );

    return addCreditorFormMetaData.componentMetaData();
  }
}
</script>
