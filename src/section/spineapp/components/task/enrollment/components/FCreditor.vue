<template>
  <v-row>
    <!--ADD START-->
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
        </v-card-text>
      </v-card>
    </v-col>
    <!--ADD END-->

    <!--EDIT START-->
    <!-- <v-col class="col-12" v-if="editDialog">
      <v-card outlined flat>
        <v-card-text class="pb-0">
          <component
              key="editCreditorFormData"
              :ref="editCreditorFormComponentMetaData.componentRef"
              :is="editCreditorFormComponentMetaData.componentName"
              v-model="editCreditorFormData"
              v-bind="editCreditorFormComponentMetaData.props"
            ></component>
        </v-card-text>
      </v-card>
    </v-col> -->
    <!--EDIT START-->

    <!--DELETE START-->
    <!-- <v-col v-if="deleteDialog">
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
            <v-btn color="error " text @click="closeAndClearAllForm">
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
    </v-col> -->
    <!--DELETE END-->

    
    <v-col class="col-12">
      <!--GRID START-->
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
          <!-- <template v-slot:[`item.actions`]="{ item }">
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
          </template> -->
        </v-data-table>
      </v-card>
      <!--GRID END-->
      <!--ACTION START-->
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
      <!--ACTION END-->
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
  
  closeAndClearAllForm() {
    this.closeAllForm();
    this.clearAllForm();
  }
  closeAllForm() {
    this.addDialog = false;
    // this.editDialog = false;
    // this.deleteDialog = false;
  }
  clearAllForm() {
    this.addCreditorFormData = {};
    // this.editCreditorFormData = {};
    // this.deleteCreditorFormData = {};
  }


  //ADD ---- START
  addDialog = false;
  addCreditorFormData: any = {};
  showAddForm() {
    this.addCreditorFormData = {};
    // this.editDialog = false;
    // this.deleteDialog = false;
    this.addDialog = true;
  }
  addCreditor() {
    this.creditorList.push(this.addCreditorFormData);
    this.onChange();// calling saveTask
    this.closeAndClearAllForm();
  }
  //ADD ---- END

  //EDIT ---- START
  // editDialog = false;
  // editCreditorFormData: any = {};
  // showEditForm() {
  //   this.editDialog = true;
  //   this.addDialog = false;
  //   this.deleteDialog = false;
  // }
  // selectEditCreditor(item: any) {
  //   this.editCreditorFormData = {
  //     id: this.creditorList.indexOf(item),
  //     ...item,
  //   };
  //   this.showEditForm();
  // }
  // editCreditor(form: any) {
  //   Object.assign(
  //     this.creditorList[this.editCreditorFormData.id],
  //     this.editCreditorFormData
  //   );
  //   this.onChange();// calling saveTask
  //   this.closeAndClearAllForm();
  // }
  //EDIT ---- END


  //DELETE ---- START
  // deleteDialog = false;
  // deleteCreditorFormData: any = {};
  // showDeleteForm() {
  //   this.editDialog = false;
  //   this.addDialog = false;
  //   this.deleteDialog = true;
  // }
  // selectDeleteCreditor(item: any) {
  //   this.deleteCreditorFormData = {
  //     id: this.creditorList.indexOf(item),
  //     ...item,
  //   };
  //   this.showDeleteForm();
  // }
  // deleteCreditor() {
  //   this.creditorList.splice(this.deleteCreditorFormData.id, 1);
  //   this.onChange();// calling saveTask
  //   this.closeAndClearAllForm();
  // }
  //DELETE ---- END


  //GRID
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
  actionComponentMetaDataList!: any;

  @Prop({ default: false })
  disabled!: boolean;

  // @Prop({
  //   default: () => {
  //     return {};
  //   },
  // })
  // editCreditorFormComponentMetaData!: any;

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
