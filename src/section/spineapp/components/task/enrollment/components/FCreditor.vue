<template>
  <v-row>
    <v-col class="col-12" v-if="addDialog">
      <ValidationObserver :ref="addCreditorFormRef" v-slot="{}">
        <v-card outlined flat>
          <v-card-text class="pb-0">
            <component
              :ref="addCreditorFormComponentMetaData.formRef"
              :is="addCreditorFormComponentMetaData.componentName"
              v-model="addCreditorFormData"
              v-bind="addCreditorFormComponentMetaData.props"
            ></component>
          </v-card-text>
          <v-card-actions>
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
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-col>

    <v-col class="col-12" v-if="editDialog">
      <ValidationObserver :ref="editCreditorFormRef" v-slot="{}">
        <v-card outlined flat>
          <v-card-text class="pb-0">
            <component
              :ref="editCreditorFormComponentMetaData.formRef"
              :is="editCreditorFormComponentMetaData.componentName"
              v-model="editCreditorFormData"
              v-bind="editCreditorFormComponentMetaData.props"
            ></component>
            <!-- <v-form>
              <v-row no-gutters>
                <v-col class="col-6 px-2">
                  <ValidationProvider
                    vid="creditor"
                    name="Creditor"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="editCreditorFormData.creditor"
                      label="Creditor"
                      outlined
                      dense
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-6 px-2">
                  <ValidationProvider
                    vid="creditorBalance"
                    name="Creditor Balance"
                    rules="required|positive"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      type="number"
                      v-model="editCreditorFormData.creditorBalance"
                      label="Creditor Balance"
                      outlined
                      dense
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-4 px-2">
                  <ValidationProvider
                    vid="lastDateOfPayment"
                    name="Last Date Of Payment"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="editCreditorFormData.lastDateOfPayment"
                      label="Last Date Of Payment"
                      outlined
                      dense
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-4 px-2">
                  <ValidationProvider
                    vid="debtType"
                    name="Debt Type"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-select
                      v-model="editCreditorFormData.debtType"
                      label="Debt Type"
                      outlined
                      dense
                      :error-messages="errors"
                      :items="[
                        'Credit Card',
                        'Personal Loans',
                        'Secured',
                        'Others',
                      ]"
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-4 px-2">
                  <ValidationProvider
                    vid="accountNumber"
                    name="Account Number"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="editCreditorFormData.accountNumber"
                      label="Account Number"
                      outlined
                      dense
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-form> -->
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
      </ValidationObserver>
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

@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    "f-form": FForm,
    "f-btn": FBtn,
  },
})
export default class FCreditor extends Vue {
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
    this.addDialog = true;
    this.editDialog = false;
    this.deleteDialog = false;
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

  addCreditor(form: any) {
    this.creditorList.push(this.addCreditorFormData);
    // this.onChange();// calling saveTask
    this.closeAndClearForm();
  }

  editCreditor(form: any) {
    Object.assign(
      this.creditorList[this.editCreditorFormData.id],
      this.editCreditorFormData
    );
    // this.onChange();// calling saveTask
    this.closeAndClearForm();
  }

  deleteCreditor() {
    this.creditorList.splice(this.deleteCreditorFormData.id, 1);
    // this.onChange();// calling saveTask
    this.closeAndClearForm();
  }

  selectDeleteCreditor(item: any) {
    this.deleteCreditorFormData = {
      id: this.creditorList.indexOf(item),
      ...item,
    };
    this.deleteDialog = true;
  }

  selectEditCreditor(item: any) {
    this.editCreditorFormData = {
      id: this.creditorList.indexOf(item),
      ...item,
    };
    this.showEditForm();
  }

  addCreditorFormRef = "addCreditorForm";
  editCreditorFormRef = "editCreditorForm";

  submitAddCreditor(action: any) {
    (this.$refs[this.addCreditorFormRef] as any)
      .validate()
      .then((success: boolean) => {
        if (success) {
          action(this.creditorListComputed);
          return;
        } else {
        }
      });
  }

  submitEditCreditor(action: any) {
    (this.$refs[this.editCreditorFormRef] as any)
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
}
</script>
