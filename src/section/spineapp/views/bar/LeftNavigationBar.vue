
<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    color="primary"
    dark
    :mini-variant.sync="mini"
  >
  
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar @click="mini = !mini">
          <!-- <v-icon class="grey lighten-1 secondary--text"> mdi-folder </v-icon> -->
          <v-img src="@/assets/logo.png"/>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title color="white">FREED</v-list-item-title>

          <!-- <v-list-item-subtitle dark>Sub text</v-list-item-subtitle> -->
        </v-list-item-content>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense dark>
      <v-list-item link @click="$router.push({ name: 'Root.Home' })">
        <v-list-item-icon>
          <v-icon>mdi-home-analytics</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="$router.push({ name: 'Root.Dashboard' })">
        <v-list-item-icon>
          <v-icon>mdi-chart-box</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item  @click="$router.push({ name: 'Root.ClientSearch' })">
        <v-list-item-icon>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Clients</v-list-item-title>
      </v-list-item>
      <v-list-item  @click="$router.push({ name: 'Root.TaskList.TaskAssignedToMe' })">
        <v-list-item-icon>
          <v-icon>mdi-check-decagram</v-icon>
        </v-list-item-icon>
        <v-list-item-title>My Tasks</v-list-item-title>
      </v-list-item>
      <!-- <v-list-group prepend-icon="mdi-inbox" id="form">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Form</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item link @click="$router.push({ name: 'Root.Form.Simple' })">
          <v-list-item-content>
            <v-list-item-title>Simple</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'Root.Form.SimpleConfig' })"
        >
          <v-list-item-content>
            <v-list-item-title>Simple Config</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-group prepend-icon="mdi-file" id="invoice">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Invoice</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          link
          @click="$router.push({ name: 'Root.Invoice.InvoiceList' })"
        >
          <v-list-item-content>
            <v-list-item-title>List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'Root.Invoice.InvoiceAdd' })"
        >
          <v-list-item-content>
            <v-list-item-title>Add</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'Root.Invoice.InvoiceEdit' })"
        >
          <v-list-item-content>
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'Root.Invoice.InvoiceDetails' })"
        >
          <v-list-item-content>
            <v-list-item-title>Details</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-group prepend-icon="mdi-box-shadow" id="Sample">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Sample</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          link
          @click="$router.push({ name: 'Root.Sample.SampleList' })"
        >
          <v-list-item-content>
            <v-list-item-title>List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'Root.Sample.SampleListConfig' })"
        >
          <v-list-item-content>
            <v-list-item-title>List Config</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'Root.Sample.SampleAdd' })"
        >
          <v-list-item-content>
            <v-list-item-title>Add</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'Root.Sample.SampleEdit' })"
        >
          <v-list-item-content>
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click="$router.push({ name: 'Root.Sample.SampleDetails' })"
        >
          <v-list-item-content>
            <v-list-item-title>Details</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group> -->
      <v-list-item link @click="$router.push({ name: 'Root.Notification' })">
        <v-list-item-icon>
          <v-icon>mdi-bell</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Notification</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-spacer vertical></v-spacer>
  </v-navigation-drawer>


</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
})
export default class LeftNavigationBar extends Vue {
    public drawer = true
    public mini = true
}
</script>
<style scoped>
.v-application .primary--text {
  color: #f56f07 !important;
  caret-color: #f56f07 !important;
}
</style>
