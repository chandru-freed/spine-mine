<template>
  <v-layout row justify-center>
    <!-- <div id="mydiv" v-show="ameyoToolbar">
      <div id="mydivheader" >
        <div class="ameyo-title">Ameyo Client</div>
        <div class="close">
           <span class="btm-action-minimize" @click.stop="dialog = !dialog">&#95;</span> 
           <span class="btm-action-close">&times;</span>
            </div>
        </div>
      <v-card v-show="dialog" max-width="220">
        <iframe
          id="ameyoIframe"
          height="535"
          width="220"
          :src="iframeUrl"
          persistent
        ></iframe>
      </v-card>
    </div> -->
    <iframe
      loading="lazy"
      id="ameyoIframe"
      allow="geolocation;microphone;camera"
      height="720"
      width="320"
      :src="iframeUrl"
      persistent
      frameborder="0"
      style="border: none; margin: 12px; border-radius: 4px"
    ></iframe>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';

@Component
export default class AmeyoToolbarDialog extends Vue {
  private crmOrigin: any;
  private ameyoBaseUrl: any = "//ameyo.freed.care:8443/";
  private get iframeUrl() {
    this.crmOrigin = window.location.href;
    return (
      this.ameyoBaseUrl +
      "ameyowebaccess/toolbarLogin-vl.htm?" +
      "origin=" +
      this.crmOrigin
    );
  }

  @Prop({})
  ameyoToolbar: boolean;

  private dialog: boolean = false;
  //Make the DIV element draggagle:

  mounted() {
    setTimeout(() => {
      window.frames[0].stop();
    }, 1000);
    // this.dragElement(document.getElementById("mydiv"));
  }

  dragElement(elmnt: any) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header")!.onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: any) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: any) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}
</script>

<style scoped>
#mydiv {
  position: absolute;
  z-index: 9000;
  background-color: #f1f1f1;
  border: 1px solid #d3d3d3;
  text-align: left;
}

#mydivheader {
  display: flex;
  flex-direction: row;
  padding: 5px;
  cursor: move;
  z-index: 9001;
  background-color: #2196f3;
  color: #fff;
  justify-content: space-around;
}
.close {
  color: #fff;
  padding: 5px;
  font-weight: bold;
  right: 0;
}
.ameyo-title {
  align-self: center;
}
.btm-action-close {
  font-weight: bold;
  padding: 5px;
  font-size: 20px;
}
.btm-action-minimize {
  font-weight: bold;
  padding: 5px;
  font-size: 20px;
}

.btm-action-close:hover,
.btm-action-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.btm-action-minimize:hover,
.btm-action-minimize:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>