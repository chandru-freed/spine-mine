<template>
  <v-row>
    <v-col class="col-12">
      <v-card flat outlined>
        <v-card-text>
          <component v-model="formData" :ref="formComponentMetaData.ref" :is="formComponentMetaData.componentName" v-bind="formComponentMetaData.props"></component>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col class="col-12">
      <v-card flat outlined>
        <v-data-table
          :headers="headers"
          :items="paymentPlanScheduleList"
          class="elevation-0"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Payment Plan</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              
            </v-toolbar>
          </template>
        </v-data-table>
      </v-card>
      <v-card-actions>
        <v-row no-gutters>
          <v-col
            v-for="(action, index) in actionList"
            :key="index"
            :class="action.boundaryClass"
          >
            <component
              :is="action.componentName"
              v-bind="action.props"
            ></component>
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
    "f-btn": FBtn
  },
})
export default class FPaymentPlan extends Vue {
  @Prop()
  id: string;

  @Prop()
  formComponentMetaData: any;

  @Prop()
  actionList: any[];

  addDialog = false;
  editDialog = false;
  dialog = false;
  dialogDelete = false;
  headers = [
    {
      text: "Month",
      align: "start",
      sortable: false,
      value: "month",
    },
    { text: "Draft Date", value: "draftDate" },
    { text: "SPA Amount", value: "spaAmount" },
    { text: "Monthly Fee", value: "monthlyFee" },
    { text: "Fee", value: "fee" },
    { text: "Amount", value: "totalAmountToBePaid" },
  ];

  paymentPlanScheduleList = [
    {
      month: "Jan 22",
      draftDate: "07/01/2022",
      spaAmount: 1200,
      monthlyFee: 0,
      fee: 0,
      totalAmountToBePaid: 1200
    },
    {
      month: "Jan 22",
      draftDate: "09/01/2022",
      spaAmount: 0,
      monthlyFee: 699,
      fee: 0,
      totalAmountToBePaid: 699
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
    this.editedIndex = this.paymentPlanScheduleList.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialogDelete = true;
  }

  deleteItemConfirm() {
    this.paymentPlanScheduleList.splice(this.editedIndex, 1);
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
    this.paymentPlanScheduleList.push(this.addDocumentFormData);
    this.addDialog = false;
  }

  editDocument(form: any) {
    Object.assign(
      this.paymentPlanScheduleList[this.editDocumentFormData.id],
      this.editDocumentFormData
    );
    this.editDialog = false;
  }

  selectEditDocument(item: any) {
    // this.editedIndex = this.paymentPlanScheduleList.indexOf(item);
    // this.editedItem = Object.assign({}, item);
    this.editDocumentFormData = {
      id: this.paymentPlanScheduleList.indexOf(item),
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
          action(this.formDataComputed);
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
          action(this.formDataComputed);
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

  formData = { };

  get formDataComputed(): any {
    return this.formData;
  }

  set formDataComputed(value) {
    this.formData = value;
  }

  // WATCH as the MODEL VALUE is a OBJ -
  // And Fields inside the Object if change does not call set of Computed
  @Watch("formData")
  updateMyForm(value: any, oldValue: any) {
    this.$emit("input", value);
  }

  mounted() {
    this.formData = this.value;
  }
  // V-MODEL END
}
</script>
