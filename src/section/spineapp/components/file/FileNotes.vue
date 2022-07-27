<template>
  <v-row >
    <v-col class="col-12">
      <v-toolbar flat class="mt-5" color="white">
        <v-textarea
          filled
          auto-grow
          label="Note"
          rows="1"
          row-height="20"
          placeholder="Leave a note ..."
        >
          <template v-slot:append>
            <v-btn class="mx-0" depressed @click="comment" color="secondary">
              Post
            </v-btn>
          </template>
        </v-textarea>
      </v-toolbar>
    </v-col>
    <v-col class="col-12 px-6 pb-0" v-for="message in messages" :key="message.time">
      <v-hover v-slot="{ hover }">
        <v-card
          flat
          :elevation="hover ? 1 : 0"
          color="grey lighten-4"
        >
          <v-card-subtitle class="pb-0 pt-3">
            {{ message.message }}</v-card-subtitle
          >

          <v-card-actions class="pt-0 pb-0">
            <v-btn color="primary" text small>
              <strong>{{ message.notesBy }}</strong> @{{ message.time }}
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                <v-btn color="primary" text small>
                  <strong>{{ message.notesBy }}</strong> @{{ message.time }}
                </v-btn>
                <v-btn color="primary" text small>
                  <strong>{{ message.notesBy }}</strong> @{{ message.time }}
                </v-btn>
                <v-btn color="primary" text small>
                  <strong>{{ message.notesBy }}</strong> @{{ message.time }}
                </v-btn>
                <v-btn color="primary" text small>
                  <strong>{{ message.notesBy }}</strong> @{{ message.time }}
                </v-btn>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-hover>
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
export default class FileNotes extends Vue {
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
      message: "Yeah, sure. Does 1:00pm work?",
      time: "10:37am",
      color: "green",
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
    },
  ];
}
</script>

<style></style>
