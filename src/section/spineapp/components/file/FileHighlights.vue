<template>
  <v-row>
    <v-col class="col-12 px-6 pb-0 mt-8">
      <v-alert
        dense
        text
        type="info"
        color="secondary"
        v-for="message in messages"
        :key="message.time"
      >
        {{ message.message }}
      </v-alert>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';

@Component
export default class FileHighlights extends Vue {
  show = false;
  messages = [
    {
      notesBy: "You",
      message: `Sure, I'll see you later.`,
      time: "10:42am",
      color: "deep-purple lighten-1",
    },
    {
      notesBy: "John Doe",
      message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      time: "10:37am",
      color: "green",
    },
    {
      notesBy: "You",
      message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      time: "9:47am",
      color: "deep-purple lighten-1",
    },
    {
      notesBy: "You",
      message: "Did you still want to grab lunch today?",
      time: "9:47am",
      color: "deep-purple lighten-1",
    },
    {
      notesBy: "You",
      message: "Did you still want to grab lunch today?",
      time: "9:47am",
      color: "deep-purple lighten-1",
    }
  ];
}
</script>

<style></style>
