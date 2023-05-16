<template>
  <div>
    <v-card flat outlined>
      <FScrollUpBtn />
      <!-- {{sampleFDataTableMetaData()}} -->
      <v-tabs v-model="tab" background-color="primary accent-4" centered dark>
        <v-tab> Table UI </v-tab>

        <v-tab> Code </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <component
            v-if="!!sampleFDataTableMetaData"
            :ref="sampleFDataTableMetaData.myRefName"
            :is="sampleFDataTableMetaData.componentName"
            :value="sampleTableData"
            v-bind="sampleFDataTableMetaData.props"
          ></component>
        </v-tab-item>
        <v-tab-item>
          Code is this
          <div class="col-12">
            <v-card min-height="60px" class="col my-4" outlined color="#c8c8c8">
              <FCopy :value="this.importStatement"/>
              <pre>{{ this.importStatement }}</pre>
            </v-card>

            <v-card min-height="60px" class="col my-4" outlined color="#c8c8c8">
              <FCopy :value="metaDataCode"/>
              <pre>{{ metaDataCode }}</pre>
            </v-card>

            <v-card min-height="60px" class="col my-4" outlined color="#c8c8c8">
              <FCopy :value="componentCode"/>
              <pre>{{ componentCode }}</pre>
            </v-card>


            <v-card min-height="60px" class="col my-4" outlined color="#c8c8c8">
              <FCopy :value="code"/>
              <pre>{{ code }}</pre>
            </v-card>
          </div>
        </v-tab-item>
      </v-tabs-items>

      <v-card-title>TableGenerator</v-card-title>
      <div class="row col">
        <div class="col-6">
          <v-text-field outlined label="Title" v-model="title"></v-text-field>
          <v-textarea
            outlined
            v-model="smileData"
            label="Enter The Smile Data Here"
          ></v-textarea>
          <v-btn small color="primary" @click="generateTable"
            >Generate Table</v-btn
          >
        </div>

        <div class="col-6">
          <v-btn small color="primary" @click="generateCode"
            >Generate code</v-btn
          >
          <div
            class="d-flex align-center"
            v-for="column of columns"
            :key="column.label"
          >
            <v-checkbox v-model="column.included" />
            <v-card-text>
              {{ column.label }}
            </v-card-text>
            <v-select
              :hide-details="true"
              v-model="column.type"
              :items="columnTypes"
              item-text="name"
              item-value="id"
              dense
              outlined
              label="Type"
            />
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>
  
  <script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';
import FForm from "@/components/generic/form/FForm.vue";
import TestFormMDP from "./TestFFromMDP";
import Flow from "@/section/spineapp/util/Flow";
import TestIntl from "./TestIntf";
import Helper from "../../util/Helper";
import FDataTableMDP from "@/components/generic/table/FDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FScrollUpBtn from "@/components/generic/FScrollUpBtn.vue";
import FCopy from "@/components/generic/FCopyBtn.vue";

interface Column {
  label: string;
  dataSelectorKey: string;
  included?: boolean;
  type?: string;
  data?: any;
}

@Component({
  components: {
    FForm,
    FDataTable,
    FScrollUpBtn,
    FCopy
  },
})
export default class Test extends Vue {
  smileData: string = `data Amendment(amndToken:string, clientFileNumber:string, amednmentStatus:string, createdOn:Date, cancelledOn:Date?, signedOn:Date?,amendmentLink: string)
     )`;
  title?: string = "";
  columns: Column[] = [];
  importStatement?: string = "";
  componentCode?: string = "";
  metaDataCode?: string = "";
  code: string = "";

  sampleTableData: any[] = [];
  tab: any = null;

  generateTable() {
    const smileData = this.smileData;
    console.log(smileData.trim());
    const unwantedSpaceRemovedString = smileData
      .replace(/[\r\n\t]+/gm, "")
      .trim();
    const splittedCodeWithData = unwantedSpaceRemovedString
      .split("data")[1]
      ?.split(/\((.*?)\)/);
    this.columns = [];
    console.log(splittedCodeWithData[1].split(","), "splittedCodeWithData");
    splittedCodeWithData[1].split(",").map((item: any) => {
      this.columns.push({
        dataSelectorKey: item.split(":")[0],
        label: this.generateLabel(item.split(":")[0]),
        included: true,
        type: this.getDataType(item.split(":")[1]),
      });
    });
    this.title = this.title || splittedCodeWithData[0];
    // this.columns = columns;
    console.log(this.columns);
  }

  getDataType(type: string = "") {
    switch (type.toLowerCase().replace(/[^a-z0-9]/gi, "")) {
      case "string":
        return "addColumn";
      case "datetime":
        return "addDateTimeColumn";
      case "date":
        return "addDateColumn";
      case "number":
        return "addCurrencyColumn";
      case "bigdecimal":
        return "addCurrencyColumn";
      case "int":
        return "addNumberColumn";
      case "boolean":
        return "addBooleanColumn";
      default:
        return "addStatusColumn";
    }
  }

  generateCode() {
    // const cols = [...this.columns];
    this.sampleFDataTableMDP = new FDataTableMDP({
      myRefName: "testDataTable",
    });
    this.code = `import FDataTableMDP from "@/components/generic/table/FDataTableMDP";\n
    export default class ${this.title}FDataTableMDP  extends FDataTableMDP {
        parent: any;
        constructor({ parent }: { parent: any }) {
            super({title: "${this.title}", myRefName: "${this.title}Ref"});
            this.parent = parent;
            this
            ${this.columns
              .filter((col) => col.included)
              .reduce((acc: string, currVal) => {
                return (
                  acc +
                  `.${currVal.type}({
                        label:"${this.generateLabel(currVal.label)}",
                        dataSelectorKey: "${currVal.dataSelectorKey.trim()}"
                    })`
                );
              }, "")}
        }
    }
    `;
    this.columns
      .filter((col) => col.included)
      .map((filCol) => {
        this.addColumn(filCol);
      });
    this.sampleFDataTableMetaData = this.sampleFDataTableMDP.getMetaData();
    this.importStatement = `import ${this.title?.trim()}FDataTableMDP from './${this.title?.trim()}FDataTableMDP'`;
    const metaDataName = `${this.toCamelCase(this.title)}FDataTableMetaData`;
    this.metaDataCode = `get ${metaDataName}() {
        return new ${this.title}FDataTableMDP({parent: this}).getMetaData()
    }`;
    this.componentCode = `  <component
    v-if="!!${metaDataName}"
    :ref="${metaDataName}.myRefName"
    :is="${metaDataName}.componentName"
    :value="[]"
    v-bind="${metaDataName}.props"
  ></component>`;
    console.log(this.code);

    const sampleDataCreator = new SampleDataGenerator({
      columns: this.columns,
      columnTypes: this.columnTypes,
    });
    this.sampleTableData = sampleDataCreator.getSampleData();
  }

  generateLabel(label: string) {
    const result = label.replace(/([A-Z])/g, " $1").trim();
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  }

  toCamelCase(text: string = "") {
    return text.replace(/\W+(. )/g, function (match, chr) {
      return chr.toUpperCase();
    });
  }

  addColumn(filCol: Column) {
    switch (filCol.type) {
      case "addColumn":
        this.sampleFDataTableMDP.addColumn({
          dataSelectorKey: filCol.dataSelectorKey,
          label: filCol.label,
        });
        break;
      case "addCurrencyColumn":
        this.sampleFDataTableMDP.addCurrencyColumn({
          dataSelectorKey: filCol.dataSelectorKey,
          label: filCol.label,
        });
        break;
      case "addDateTimeColumn":
        this.sampleFDataTableMDP.addDateTimeColumn({
          dataSelectorKey: filCol.dataSelectorKey,
          label: filCol.label,
        });
        break;
      case "addNumberColumn":
        this.sampleFDataTableMDP.addNumberColumn({
          dataSelectorKey: filCol.dataSelectorKey,
          label: filCol.label,
        });
        break;

      case "addDateColumn":
        this.sampleFDataTableMDP.addDateColumn({
          dataSelectorKey: filCol.dataSelectorKey,
          label: filCol.label,
        });
        break;

      case "addClientFileNumberColumn":
        this.sampleFDataTableMDP.addClientFileNumberColumn({
          dataSelectorKey: filCol.dataSelectorKey,
          label: filCol.label,
        });
        break;
      case "addBooleanColumn":
        this.sampleFDataTableMDP.addBooleanColumn({
          dataSelectorKey: filCol.dataSelectorKey,
          label: filCol.label,
        });
        break;

      case "addClientNameColumn":
        this.sampleFDataTableMDP.addClientNameColumn({
          dataSelectorKey: filCol.dataSelectorKey,
          label: filCol.label,
        });
        break;

      case "addClientFileStatusColumn":
        this.sampleFDataTableMDP.addClientFileStatusColumn({
          dataSelectorKey: filCol.dataSelectorKey,
          label: filCol.label,
        });
        break;

      case "addStatusColumn":
        this.sampleFDataTableMDP.addStatusColumn({
          dataSelectorKey: filCol.dataSelectorKey,
          label: filCol.label,
        });
        break;

      case "addEMandateStatusColumn":
        this.sampleFDataTableMDP.addEMandateStatusColumn({
          dataSelectorKey: filCol.dataSelectorKey,
          label: filCol.label,
        });
        break;

      case "addPaymentStatusColumn":
        this.sampleFDataTableMDP.addPaymentStatusColumn({
          dataSelectorKey: filCol.dataSelectorKey,
          label: filCol.label,
        });
        break;

      case "addPaymentProviderColumn":
        this.sampleFDataTableMDP.addPaymentProviderColumn({
          dataSelectorKey: filCol.dataSelectorKey,
          label: filCol.label,
        });
        break;

      default:
        this.sampleFDataTableMDP.addColumn({
          dataSelectorKey: filCol.dataSelectorKey,
          label: filCol.label,
        });
        break;
    }
  }

  sampleFDataTableMDP: FDataTableMDP = new FDataTableMDP({
    myRefName: "testDataTable",
  });

  sampleFDataTableMetaData: any = {};

  columnTypes = [
    {
      id: "addColumn",
      name: "Normal",
    },
    {
      id: "addCurrencyColumn",
      name: "Currency",
    },
    {
      id: "addNumberColumn",
      name: "Number",
    },
    {
      id: "addDateTimeColumn",
      name: "Date Time",
    },
    {
      id: "addDateColumn",
      name: "Date",
    },
    {
      id: "addClientFileNumberColumn",
      name: "Client File Number",
    },
    {
      id: "addBooleanColumn",
      name: "Boolean",
    },
    {
      id: "addClientNameColumn",
      name: "Client Name",
    },
    {
      id: "addClientFileStatusColumn",
      name: "Client File Status",
    },
    {
      id: "addStatusColumn",
      name: " Status",
    },
    {
      id: "addEMandateStatusColumn",
      name: " EMandate Status",
    },
    {
      id: "addPaymentProviderColumn",
      name: " Payment Provider",
    },
    {
      id: "addPaymentStatusColumn",
      name: " Payment Status",
    },
  ];
}

class SampleDataGenerator {
  namesList = [
    "Govind",
    "Sagar",
    "Vishwa",
    "Alok",
    "Umesh",
    "Deepak",
    "Ritesh",
    "Keshav",
    "Keshav",
    "Keshav",
  ];
  cfNumberList = [
    "KFSINH-0523-123613",
    "KFSINH-0533-123421",
    "KFSINH-0263-988277",
    "KFSINH-0133-122323",
    "KFSINH-0101-100293",
    "KFSINH-2301-100113",
    "KFSINH-2301-100113",
    "KFSINH-2301-100113",
    "KFSINH-2301-100113",
    "KFSINH-2301-100113",
  ];

  statusList = [
    "Rejected",
    "Accepted",
    "Denied",
    "Rejected",
    "Accepted",
    "Denied",
    "Rejected",
    "Accepted",
    "Denied",
    "Rejected",
    "Accepted",
    "Denied",
  ];
  columns: Column[];
  columnTypes: any[];

  constructor(props: { columns: Column[]; columnTypes: any }) {
    this.columns = props.columns;
    this.columnTypes = props.columnTypes;
  }
  getSampleData() {
    console.log(this.columns, "Columns");
    let dataList = [];
    for (let i = 0; i < 5; i++) {
      let data: any = {};
      this.columns.forEach((filCol) => {
        switch (filCol.type) {
          case "addColumn":
            data[filCol.dataSelectorKey] = this.getName();
            break;
          case "addCurrencyColumn":
            data[filCol.dataSelectorKey] = this.getCurrency();
            break;
          case "addNumberColumn":
            data[filCol.dataSelectorKey] = this.getCurrency();
            break;
          case "addDateTimeColumn":
            data[filCol.dataSelectorKey] = this.getDateTime();
            break;
          case "addDateColumn":
            data[filCol.dataSelectorKey] = this.getDateTime();
            break;
          case "addClientFileNumberColumn":
            data[filCol.dataSelectorKey] = this.getCfNumber();
            break;
          case "addBooleanColumn":
            data[filCol.dataSelectorKey] = this.getBoolean();
            break;

          case "addStatusColumn":
            data[filCol.dataSelectorKey] = this.getStatus();
            break;

          case "addClientFileStatusColumn":
            data[filCol.dataSelectorKey] = this.getStatus();
            break;

          case "addEMandateStatusColumn":
            data[filCol.dataSelectorKey] = this.getStatus();
            break;
          case "addPaymentProviderColumn":
            data[filCol.dataSelectorKey] = this.getStatus();
            break;
          case "addPaymentStatusColumn":
            data[filCol.dataSelectorKey] = this.getStatus();
            break;
          case "addStatusColumn":
            data[filCol.dataSelectorKey] = this.getStatus();
            break;
          case "addStatusColumn":
            data[filCol.dataSelectorKey] = this.getStatus();
            break;

          default:
            data[filCol.dataSelectorKey] = this.getName();
            break;
        }
        // const index = this.columnTypes.findIndex((item: any) => item.id === filCol.type)
        // data[filCol.dataSelectorKey] = this.columnTypes[index].data;
      });
      dataList.push(data);
    }
    return dataList;
  }

  getName() {
    const randomNum = Math.floor(Math.random() * 10);
    return this.namesList[randomNum];
  }
  getCfNumber() {
    const randomNum = Math.floor(Math.random() * 10);
    return this.cfNumberList[randomNum];
  }
  getStatus() {
    const randomNum = Math.floor(Math.random() * 10);
    return this.statusList[randomNum];
  }

  getBoolean() {
    const randomNum = Math.floor(Math.random() * 100);
    return randomNum % 2 == 0;
  }

  getCurrency() {
    return Math.floor(Math.random() * 100000);
  }

  getDateTime() {
    var randomTimestamp = Math.floor(Math.random() * Date.now());

    // Convert the timestamp to a Date object
    return new Date(randomTimestamp);
  }
}
</script>
  
  <style>
</style>
  






