<template>
  <v-row>
    <v-col class="col-12">
      <ValidationObserver ref="newCreditor" v-slot="{}">
        <v-card flat color="transparent">
          <v-card-text class="pa-0">
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
                      v-model="defaultItem.creditor"
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
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="defaultItem.creditorBalance"
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
                      v-model="defaultItem.lastDateOfPayment"
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
                    <v-text-field
                      v-model="defaultItem.debtType"
                      label="Debt Type"
                      outlined
                      dense
                      :error-messages="errors"
                    ></v-text-field>
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
                      v-model="defaultItem.accountNumber"
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
            <v-btn color="primary " text @click="close"> Cancel </v-btn>

            <v-spacer></v-spacer>
            <v-btn outlined color="primary " @click="add"> Add </v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-col>
    <v-col class="col-12">
      <v-data-table
        :headers="headers"
        :items="creditorList"
        sort-by="lastDateOfPayment"
        class="elevation-0"
        color="transparent"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Creditor List</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card flat>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
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
                                v-model="defaultItem.creditor"
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
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="defaultItem.creditorBalance"
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
                                v-model="defaultItem.lastDateOfPayment"
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
                              <v-text-field
                                v-model="defaultItem.debtType"
                                label="Debt Type"
                                outlined
                                dense
                                :error-messages="errors"
                              ></v-text-field>
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
                                v-model="defaultItem.accountNumber"
                                label="Account Number"
                                outlined
                                dense
                                :error-messages="errors"
                              ></v-text-field>
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="add"> Add </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
        <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template> -->
      </v-data-table>
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
    {creditor : "HDFC", creditorBalance: "200000", lastDateOfPayment: "12/12/2021",debtType: "credit card",accountNumber: "1231231234"  }
  ];
  editedIndex = -1;
  editedItem: any = {
    creditor: "",
    creditorBalance: "",
    lastDateOfPayment: "",
    debtType: "",
    accountNumber: "",
  };
  defaultItem = {
    creditor: "",
    creditorBalance: "",
    lastDateOfPayment: "",
    debtType: "",
    accountNumber: "",
  };

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
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  }

  closeDelete() {
    this.dialogDelete = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  }

  add() {
    if (this.editedIndex > -1) {
      Object.assign(this.creditorList[this.editedIndex], this.editedItem);
    } else {
      this.creditorList.push(this.defaultItem);
    }
    this.close();
  }

  @Prop()
  onChange: () => void;

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
