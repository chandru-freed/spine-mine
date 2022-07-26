<template>
  <v-row>
    <v-col class="col-12" v-if="addDialog">
      <ValidationObserver :ref="addCreditorFormRef" v-slot="{}">
        <v-card outlined flat>
          <v-card-text class="pb-0">
            <v-form>
              <v-row no-gutters>
                <v-col class="col-6 px-2">
                  <ValidationProvider
                    vid="creditor"
                    name="Creditor"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="addCreditorFormData.creditor"
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
                      v-model="addCreditorFormData.creditorBalance"
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
                      v-model="addCreditorFormData.lastDateOfPayment"
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
                      v-model="addCreditorFormData.debtType"
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
                      v-model="addCreditorFormData.accountNumber"
                      label="Account Number"
                      outlined
                      dense
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary " text @click="addDialog = false">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary " @click="submitAddCreditor(addCreditor)">
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
            <v-form>
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
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary " text @click="editDialog = false">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary " @click="submitEditCreditor(editCreditor)">
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-col>
    <v-col class="col-12">
      <v-card flat outlined>
      <v-data-table
        :headers="headers"
        :items="creditorList"
        sort-by="lastDateOfPayment"
        class="elevation-0"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Creditor List</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              icon
              color="primary"
              dark
              class="mb-2"
              @click="addDialog = true"
            >
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>

            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="selectEditCreditor (item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template> -->
      </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
  },
})
export default class FCreditor extends Vue {
  addDialog = false;
  editDialog = false;
  dialog = false;
  dialogDelete = false;
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

  creditorList = [
    {
      creditor: "HDFC",
      creditorBalance: "200000",
      lastDateOfPayment: "12/12/2021",
      debtType: "Credit Card",
      accountNumber: "1231231234",
    },
  ];
  editedIndex = -1;
  editedItem: any = {
    creditor: "",
    creditorBalance: "",
    lastDateOfPayment: "",
    debtType: "",
    accountNumber: "",
  };


  addCreditorFormData: any = {};
  editCreditorFormData: any = {};

  get formTitle() {
    return this.editedIndex === -1 ? "New Item" : "Edit Item";
  }

  @Watch("dialog")
  updatedDialog(val: any, oldValue: any) {
    val || this.close();
  }

  @Watch("dialogDelete")
  updatedDeleteDialog(val: any, oldValue: any) {
    val || this.closeDelete();
  }

  editItem(item: any) {
    this.editedIndex = this.creditorList.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialog = true;
  }

  deleteItem(item: any) {
    this.editedIndex = this.creditorList.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialogDelete = true;
  }

  deleteItemConfirm() {
    this.creditorList.splice(this.editedIndex, 1);
    this.closeDelete();
  }

  close() {
    this.dialog = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.addCreditorFormData);
      this.editedIndex = -1;
    });
  }

  closeDelete() {
    this.dialogDelete = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.addCreditorFormData);
      this.editedIndex = -1;
    });
  }

  addCreditor(form: any) {
    this.creditorList.push(this.addCreditorFormData);
    this.addDialog = false
  }

  editCreditor(form: any) {
    Object.assign(this.creditorList[this.editCreditorFormData.id], this.editCreditorFormData)
    this.editDialog = false
  }

  selectEditCreditor(item: any) {
    // this.editedIndex = this.creditorList.indexOf(item);
    // this.editedItem = Object.assign({}, item);
    this.editCreditorFormData = {id: this.creditorList.indexOf(item), ... item}
    this.editDialog = true;
  }

  addCreditorFormRef = "addCreditorForm";
  editCreditorFormRef = "editCreditorForm";

  submitAddCreditor(action: any) {
    (this.$refs[this.addCreditorFormRef] as any)
      .validate()
      .then((success: boolean) => {
        if (success) {
          action(this.modelValue);
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
          action(this.modelValue);
          return;
        } else {
        }
      });
  }

  // V-MODEL START
  @Prop({
    default: () => {
      return {};
    },
  })
  value!: any;

  address = { country: "India" };

  get modelValue(): any {
    return this.address;
  }

  set modelValue(value) {
    this.address = value;
  }

  // WATCH as the MODEL VALUE is a OBJ -
  // And Fields inside the Object if change does not call set of Computed
  @Watch("address")
  updateMyForm(value: any, oldValue: any) {
    this.$emit("input", value);
  }

  mounted() {
    this.address = this.value;
  }
  // V-MODEL END
}
</script>
