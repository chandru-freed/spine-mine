<template>
  <v-row>
    <v-col class="col-12" v-if="addDialog">
      <ValidationObserver :ref="addDocumentFormRef" v-slot="{}">
        <v-card outlined flat>
          <v-card-text class="pb-0">
            <v-form>
              <v-row no-gutters>
                <v-col class="col-6 px-2">
                  <ValidationProvider
                    vid="documentType"
                    name="Doc Type"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-select
                      v-model="addDocumentFormData.documentType"
                      label="Doc Type"
                      outlined
                      dense
                      :error-messages="errors"
                      :items="[
                        'PAN Card',
                        'Contact',
                        'Address Proof',
                        'Credit report',
                        'Others',
                      ]"
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-6 px-2">
                  <ValidationProvider
                    vid="document"
                    name="Doc"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-file-input
                      v-model="addDocumentFormData.documentName"
                      label="File input"
                      outlined
                      dense
                      :error-messages="errors"
                    ></v-file-input>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-4 px-2">
                  <ValidationProvider
                    vid="documentName"
                    name="Doc Name"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="addDocumentFormData.documentName"
                      label="Doc Name"
                      outlined
                      dense
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-4 px-2">
                  <ValidationProvider
                    vid="documentDesc"
                    name="Doc Description"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="addDocumentFormData.documentDescription"
                      label="Doc Description"
                      outlined
                      dense
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-4 px-2">
                  <ValidationProvider
                    vid="documentLocation"
                    name="Doc Location"
                    rules="required|positive"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="addDocumentFormData.documentLocation"
                      label="Doc Location"
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
            <v-btn
              outlined
              color="primary "
              @click="submitAddDocument(addDocument)"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-col>
    <v-col class="col-12" v-if="editDialog">
      <ValidationObserver :ref="editDocumentFormRef" v-slot="{}">
        <v-card outlined flat>
          <v-card-text class="pb-0">
            <v-form>
              <v-row no-gutters>
                
                <v-col class="col-6 px-2">
                  <ValidationProvider
                    vid="documentType"
                    name="Document Type"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-select
                      v-model="editDocumentFormData.documentType"
                      label="Doc Type"
                      outlined
                      dense
                      :error-messages="errors"
                      :items="[
                        'PAN Card',
                        'Contact',
                        'Address Proof',
                        'Credit report',
                        'Others',
                      ]"
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-6 px-2">
                  <ValidationProvider
                    vid="document"
                    name="Doc"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-file-input
                      v-model="addDocumentFormData.documentName"
                      label="File input"
                      outlined
                      disabled
                      dense
                      :error-messages="errors"
                    ></v-file-input>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-4 px-2">
                  <ValidationProvider
                    vid="documentName"
                    name="Doc Name"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="editDocumentFormData.documentName"
                      label="Doc Name"
                      outlined
                      dense
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-4 px-2">
                  <ValidationProvider
                    vid="documentDesc"
                    name="Doc Description"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="editDocumentFormData.documentDescription"
                      label="Doc Description"
                      outlined
                      dense
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-4 px-2">
                  <ValidationProvider
                    vid="documentLocation"
                    name="Document Location"
                    rules="required|positive"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="editDocumentFormData.documentLocation"
                      label="Document Location"
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
            <v-btn
              outlined
              color="primary "
              @click="submitEditCreditor(editDocument)"
            >
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
          :items="documentList"
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
            <v-icon small class="mr-2" @click="selectEditDocument(item)">
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
export default class FDocument extends Vue {
  addDialog = false;
  editDialog = false;
  dialog = false;
  dialogDelete = false;
  headers = [
    {
      text: "Name",
      align: "start",
      sortable: false,
      value: "documentName",
    },
    { text: "Description", value: "documentDescription"},
    { text: "Path", value: "documentLocation" },
    { text: "Type", value: "documentType" },
    { text: "Actions", value: "actions" },
  ];

  documentList = [
    {
      documentName: "PAN",
      documentLocation: "/asd/asd/pan.jpg",
      documentType: "PAN Card",
      documentDescription: "Pan Card Bla bla",
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

  addDocumentFormData: any = {};
  editDocumentFormData: any = {};

  @Watch("dialogDelete")
  updatedDeleteDialog(val: any, oldValue: any) {
    val || this.closeDelete();
  }

  deleteItem(item: any) {
    this.editedIndex = this.documentList.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialogDelete = true;
  }

  deleteItemConfirm() {
    this.documentList.splice(this.editedIndex, 1);
    this.closeDelete();
  }

  closeDelete() {
    this.dialogDelete = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.addDocumentFormData);
      this.editedIndex = -1;
    });
  }

  addDocument(form: any) {
    this.documentList.push(this.addDocumentFormData);
    this.addDialog = false;
  }

  editDocument(form: any) {
    Object.assign(
      this.documentList[this.editDocumentFormData.id],
      this.editDocumentFormData
    );
    this.editDialog = false;
  }

  selectEditDocument(item: any) {
    // this.editedIndex = this.documentList.indexOf(item);
    // this.editedItem = Object.assign({}, item);
    this.editDocumentFormData = {
      id: this.documentList.indexOf(item),
      ...item,
    };
    this.editDialog = true;
  }

  addDocumentFormRef = "addDocumentForm";
  editDocumentFormRef = "editDocumentForm";

  submitAddDocument(action: any) {
    (this.$refs[this.addDocumentFormRef] as any)
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
    (this.$refs[this.editDocumentFormRef] as any)
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
